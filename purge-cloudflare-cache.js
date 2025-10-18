#!/usr/bin/env node

const CLOUDFLARE_API_TOKEN = 'bC7ZAuyTq4xWT0SVyTuDMwSIi3Uyv-XMHjakuWIF';
const ZONE_ID = '90e11747b7f3751a00b6f2ea6eb35ab3';

async function purgeCache() {
  const headers = {
    'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
    'Content-Type': 'application/json'
  };

  try {
    console.log('Purging entire Cloudflare cache for mentoragile.com...');

    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        purge_everything: true
      })
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ Cache purged successfully!');
      console.log('The site should now load the latest version.');
      console.log('Please wait a few seconds and then test mentoragile.com');
    } else {
      console.log('❌ Failed to purge cache:', data.errors);
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

purgeCache();