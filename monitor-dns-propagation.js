#!/usr/bin/env node

const dns = require('dns').promises;
const https = require('https');
const http = require('http');

const DOMAIN = 'mentoragile.com';
const EXPECTED_TARGET = 'ma-landing-335cl.ondigitalocean.app';

async function checkDNS() {
  console.log('=== DNS Propagation Monitor ===');
  console.log(`Time: ${new Date().toISOString()}\n`);

  try {
    // Check CNAME records
    console.log('1. DNS Resolution Check:');
    try {
      const cname = await dns.resolveCname(DOMAIN);
      console.log(`   ✓ CNAME for ${DOMAIN}: ${cname}`);
      if (cname[0] === EXPECTED_TARGET) {
        console.log(`   ✅ DNS correctly pointing to DigitalOcean`);
      } else {
        console.log(`   ⚠️  DNS pointing to: ${cname[0]} (unexpected)`);
      }
    } catch (e) {
      console.log(`   ℹ️  No CNAME found, checking A records...`);
      const ips = await dns.resolve4(DOMAIN);
      console.log(`   A records: ${ips.join(', ')}`);
    }

    // Check www subdomain
    try {
      const wwwCname = await dns.resolveCname(`www.${DOMAIN}`);
      console.log(`   ✓ CNAME for www.${DOMAIN}: ${wwwCname}`);
    } catch (e) {
      console.log(`   ℹ️  No CNAME for www subdomain`);
    }

    // Check nameservers
    const ns = await dns.resolveNs(DOMAIN);
    console.log(`\n2. Nameservers (${ns.length} found):`);
    ns.slice(0, 3).forEach(server => {
      console.log(`   - ${server}`);
    });
    if (ns[0].includes('cloudflare')) {
      console.log('   ℹ️  Using Cloudflare nameservers');
    }

  } catch (error) {
    console.error('DNS lookup error:', error.message);
  }
}

function checkHTTP(url, label) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (DNS Monitor)',
        'Accept': 'text/html'
      },
      timeout: 10000,
      rejectUnauthorized: false // Allow self-signed certs
    }, (res) => {
      let body = '';

      res.on('data', chunk => {
        // Only capture first 1000 chars
        if (body.length < 1000) {
          body += chunk;
        }
      });

      res.on('end', () => {
        console.log(`\n${label}:`);
        console.log(`   Status: ${res.statusCode}`);
        console.log(`   Location Header: ${res.headers.location || 'none'}`);

        // Check for redirects
        if (res.statusCode >= 300 && res.statusCode < 400) {
          console.log(`   ⚠️  REDIRECT detected to: ${res.headers.location}`);
        }

        // Check body content
        if (body.includes('NEXT_REDIRECT')) {
          console.log('   ❌ Next.js redirect error in body');
        } else if (body.includes('course-landing') || body.includes('Master AI Revolution')) {
          console.log('   ✅ Course landing page content detected');
        } else if (body.includes('leadconnectorhq') || body.includes('gohighlevel')) {
          console.log('   ⚠️  GoHighLevel scripts detected in response');
        } else if (body.includes('courses.mentoragile.com')) {
          console.log('   ⚠️  Redirect to courses subdomain in content');
        }

        resolve();
      });
    }).on('error', (err) => {
      console.log(`\n${label}:`);
      console.log(`   ❌ Error: ${err.message}`);
      resolve();
    });
  });
}

async function checkCacheHeaders() {
  return new Promise((resolve) => {
    https.get(`https://${DOMAIN}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      timeout: 10000
    }, (res) => {
      console.log('\n4. Cache Status:');
      console.log(`   CF-Cache-Status: ${res.headers['cf-cache-status'] || 'not found'}`);
      console.log(`   CF-Ray: ${res.headers['cf-ray'] || 'not found'}`);
      console.log(`   Server: ${res.headers['server'] || 'unknown'}`);
      console.log(`   X-Powered-By: ${res.headers['x-powered-by'] || 'not specified'}`);

      if (res.headers['cf-cache-status'] === 'HIT') {
        console.log('   ⚠️  Response served from Cloudflare cache');
      } else if (res.headers['server']?.includes('cloudflare')) {
        console.log('   ℹ️  Response proxied through Cloudflare');
      } else {
        console.log('   ✅ Response served directly from origin');
      }

      resolve();
    }).on('error', resolve);
  });
}

async function testDifferentDNS() {
  console.log('\n5. Testing with different DNS servers:');

  const dnsServers = [
    { name: 'Google', ip: '8.8.8.8' },
    { name: 'Cloudflare', ip: '1.1.1.1' },
    { name: 'OpenDNS', ip: '208.67.222.222' }
  ];

  for (const server of dnsServers) {
    dns.setServers([server.ip]);
    try {
      const result = await dns.resolveCname(DOMAIN).catch(() => dns.resolve4(DOMAIN));
      console.log(`   ${server.name} (${server.ip}): ${Array.isArray(result) ? result[0] : result}`);
    } catch (e) {
      console.log(`   ${server.name} (${server.ip}): Failed - ${e.message}`);
    }
  }
}

async function main() {
  console.clear();

  // DNS checks
  await checkDNS();

  // HTTP checks
  console.log('\n3. HTTP Response Tests:');
  await checkHTTP(`https://${DOMAIN}`, '   Direct HTTPS');
  await checkHTTP(`http://${DOMAIN}`, '   Direct HTTP');
  await checkHTTP(`https://${EXPECTED_TARGET}`, '   DigitalOcean App Direct');

  // Cache headers
  await checkCacheHeaders();

  // Different DNS servers
  await testDifferentDNS();

  console.log('\n=== Recommendations ===');
  console.log('1. If seeing "HIT" in CF-Cache-Status, cache needs to expire');
  console.log('2. DNS propagation typically takes 1-48 hours globally');
  console.log('3. Try clearing browser cache and DNS cache:');
  console.log('   - Chrome: chrome://net-internals/#dns → Clear host cache');
  console.log('   - macOS: sudo dscacheutil -flushcache');
  console.log('   - Windows: ipconfig /flushdns');
  console.log('4. Test in incognito/private mode to bypass browser cache');
  console.log('\nNext check in 15 minutes to monitor propagation...\n');
}

// Run immediately
main();

// Optional: Run every 15 minutes
if (process.argv.includes('--watch')) {
  console.log('Running in watch mode - checking every 15 minutes...');
  setInterval(main, 15 * 60 * 1000);
}