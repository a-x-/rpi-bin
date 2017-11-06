#!/bin/sh
# download rutracker torrent file

login=$(cat ~/.config/rutracker-cli/config.json | jq .username)
password=$(cat ~/.config/rutracker-cli/config.json | jq .password)
torrent_id=$1 # 5291059

rutracker_cookie=$(ssh root@invntrm.ru "echo '?redirect=index.php&login_username=$login&login_password=$password&login=%C2%F5%EE%E4' | http --headers --form post 'http://rutracker.net/forum/login.php'  \
	| grep Set-Cookie \
	| grep -oE 'bb_session=[^;]+'")
echo rutracker_cookie $rutracker_cookie

# 'redirect=index.php' 'login_username=$login' 'login_password=$password' 'login=%C2%F5%EE%E4'

ssh root@invntrm.ru "http --download 'http://rutracker.net/forum/dl.php?t=$torrent_id' 'Cookie: $rutracker_cookie'"
