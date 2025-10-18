#!/bin/bash

echo "=== DNS Cache Clear Script ==="
echo "This will help clear DNS caches to see the updated site"
echo ""

# Detect OS
OS=$(uname -s)

if [ "$OS" = "Darwin" ]; then
    echo "macOS detected. Clearing DNS cache..."
    sudo dscacheutil -flushcache
    sudo killall -HUP mDNSResponder 2>/dev/null
    echo "✓ macOS DNS cache cleared"

elif [ "$OS" = "Linux" ]; then
    echo "Linux detected. Clearing DNS cache..."
    # Try systemd-resolved first (modern systems)
    if command -v resolvectl &> /dev/null; then
        sudo resolvectl flush-caches
        echo "✓ systemd-resolved cache cleared"
    # Try nscd
    elif [ -f /etc/init.d/nscd ]; then
        sudo /etc/init.d/nscd restart
        echo "✓ nscd cache cleared"
    # Try dnsmasq
    elif command -v dnsmasq &> /dev/null; then
        sudo killall -HUP dnsmasq
        echo "✓ dnsmasq cache cleared"
    else
        echo "⚠️  Could not determine DNS cache service"
    fi

else
    echo "For Windows, run this command as Administrator:"
    echo "  ipconfig /flushdns"
fi

echo ""
echo "Browser cache clearing:"
echo "1. Chrome: Visit chrome://net-internals/#dns and click 'Clear host cache'"
echo "2. Firefox: Restart browser or clear all cache (Ctrl+Shift+Del)"
echo "3. Safari: Develop menu → Empty Caches"
echo "4. Edge: edge://net-internals/#dns and click 'Clear host cache'"
echo ""
echo "Testing the site:"
echo "1. Try incognito/private mode first"
echo "2. Direct link (should work): https://ma-landing-335cl.ondigitalocean.app"
echo "3. Main domain: https://mentoragile.com"
echo ""
echo "If still redirecting, the issue is upstream DNS caching. Wait 1-4 hours."