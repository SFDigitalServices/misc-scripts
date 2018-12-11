echo "starting certificate check at $(date)"
while read site; do
  ./cert_warn.sh $site
done<our_servers.txt
