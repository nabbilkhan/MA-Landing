#!/usr/bin/env node

const CLOUDFLARE_API_TOKEN = 'bC7ZAuyTq4xWT0SVyTuDMwSIi3Uyv-XMHjakuWIF';
const ZONE_ID = '90e11747b7f3751a00b6f2ea6eb35ab3';

async function updateWWW() {
  const headers = {
    'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
    'Content-Type': 'application/json'
  };

  try {
    // Get the current DNS records
    console.log('Getting www DNS record...');
    const recordsResponse = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records`, {
      headers
    });
    const recordsData = await recordsResponse.json();

    if (recordsData.success) {
      // Find the www domain CNAME record
      const wwwRecord = recordsData.result.find(r =>
        r.name === 'www.mentoragile.com' && r.type === 'CNAME'
      );

      if (wwwRecord) {
        console.log('Found www CNAME record:', wwwRecord.id);
        console.log('Current: proxied =', wwwRecord.proxied);

        // Update the record to disable proxy
        console.log('Updating www to disable Cloudflare proxy...');

        const updateResponse = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records/${wwwRecord.id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            type: 'CNAME',
            name: 'www',
            content: 'mentoragile.com',
            ttl: 1,
            proxied: false  // Disable proxy for www too
          })
        });

        const updateData = await updateResponse.json();

        if (updateData.success) {
          console.log('✅ www DNS updated successfully!');
          console.log('Both root and www are now in DNS-only mode');
          console.log('The redirect issue should be resolved once DNS propagates');
        } else {
          console.log('❌ Failed to update www DNS:', updateData.errors);
        }
      }
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

updateWWW();