#!/usr/bin/env node

const CLOUDFLARE_API_TOKEN = 'bC7ZAuyTq4xWT0SVyTuDMwSIi3Uyv-XMHjakuWIF';
const ZONE_ID = '90e11747b7f3751a00b6f2ea6eb35ab3';

async function updateDNS() {
  const headers = {
    'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
    'Content-Type': 'application/json'
  };

  try {
    // First, get the current DNS records
    console.log('Getting current DNS records...');
    const recordsResponse = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records`, {
      headers
    });
    const recordsData = await recordsResponse.json();

    if (recordsData.success) {
      // Find the root domain CNAME record
      const rootRecord = recordsData.result.find(r =>
        r.name === 'mentoragile.com' && r.type === 'CNAME'
      );

      if (rootRecord) {
        console.log('Found root CNAME record:', rootRecord.id);
        console.log('Current: proxied =', rootRecord.proxied);

        // Update the record to disable proxy (orange cloud off)
        console.log('Updating to disable Cloudflare proxy (DNS only mode)...');

        const updateResponse = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records/${rootRecord.id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            type: 'CNAME',
            name: 'mentoragile.com',
            content: 'ma-landing-335cl.ondigitalocean.app',
            ttl: 1,
            proxied: false  // This disables Cloudflare proxy
          })
        });

        const updateData = await updateResponse.json();

        if (updateData.success) {
          console.log('✅ DNS updated successfully!');
          console.log('Cloudflare proxy is now DISABLED (grey cloud)');
          console.log('The site will now be served directly from DigitalOcean');
          console.log('Note: This bypasses Cloudflare CDN but fixes the redirect issue');
          console.log('\nPlease wait 1-5 minutes for DNS to propagate, then test mentoragile.com');
        } else {
          console.log('❌ Failed to update DNS:', updateData.errors);
        }
      } else {
        console.log('Root CNAME record not found');
      }
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

updateDNS();