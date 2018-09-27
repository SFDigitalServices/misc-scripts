while read site; do
  ./cert_warn.sh $site
done<our_servers.txt
