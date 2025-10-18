#!/usr/bin/env node

const CLOUDFLARE_API_TOKEN = 'bC7ZAuyTq4xWT0SVyTuDMwSIi3Uyv-XMHjakuWIF';
const ZONE_ID = '90e11747b7f3751a00b6f2ea6eb35ab3';

async function checkCloudflare() {
  const headers = {
    'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
    'Content-Type': 'application/json'
  };

  try {
    // Check DNS records
    console.log('=== Checking DNS Records ===');
    const dnsResponse = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records`, {
      headers
    });
    const dnsData = await dnsResponse.json();

    if (dnsData.success) {
      const relevantRecords = dnsData.result.filter(r =>
        r.name === 'mentoragile.com' ||
        r.name === 'www.mentoragile.com'
      );
      console.log('DNS Records for mentoragile.com:');
      relevantRecords.forEach(r => {
        console.log(`  ${r.name} -> ${r.type} -> ${r.content} (Proxied: ${r.proxied})`);
      });
    }

    // Check Page Rules
    console.log('\n=== Checking Page Rules ===');
    const pageRulesResponse = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/pagerules`, {
      headers
    });
    const pageRulesData = await pageRulesResponse.json();

    if (pageRulesData.success) {
      if (pageRulesData.result && pageRulesData.result.length > 0) {
        console.log('Page Rules found:');
        pageRulesData.result.forEach(rule => {
          console.log(`  Target: ${JSON.stringify(rule.targets)}`);
          console.log(`  Actions: ${JSON.stringify(rule.actions)}`);
          console.log(`  Status: ${rule.status}`);
          console.log('  ---');
        });
      } else {
        console.log('No page rules found');
      }
    }

    // Check Workers
    console.log('\n=== Checking Workers ===');
    const workersResponse = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/workers/routes`, {
      headers
    });
    const workersData = await workersResponse.json();

    if (workersData.success) {
      if (workersData.result && workersData.result.length > 0) {
        console.log('Worker routes found:');
        workersData.result.forEach(route => {
          console.log(`  Pattern: ${route.pattern}`);
          console.log(`  Script: ${route.script}`);
          console.log('  ---');
        });
      } else {
        console.log('No worker routes found');
      }
    }

    // Check Redirect Rules
    console.log('\n=== Checking Redirect Rules ===');
    const redirectRulesResponse = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/rulesets`, {
      headers
    });
    const redirectRulesData = await redirectRulesResponse.json();

    if (redirectRulesData.success) {
      const redirectRulesets = redirectRulesData.result.filter(r =>
        r.phase === 'http_request_dynamic_redirect' ||
        r.phase === 'http_request_redirect'
      );

      if (redirectRulesets.length > 0) {
        console.log('Redirect rulesets found:');
        for (const ruleset of redirectRulesets) {
          const rulesResponse = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/rulesets/${ruleset.id}`, {
            headers
          });
          const rulesData = await rulesResponse.json();

          if (rulesData.success && rulesData.result.rules && rulesData.result.rules.length > 0) {
            console.log(`  Ruleset: ${ruleset.name} (${ruleset.phase})`);
            rulesData.result.rules.forEach(rule => {
              console.log(`    Rule: ${rule.description || 'No description'}`);
              console.log(`    Expression: ${rule.expression}`);
              console.log(`    Action: ${JSON.stringify(rule.action)}`);
              console.log(`    Enabled: ${rule.enabled}`);
              console.log('    ---');
            });
          }
        }
      } else {
        console.log('No redirect rulesets found');
      }
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkCloudflare();