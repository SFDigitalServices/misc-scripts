exp_date=$(echo | openssl s_client -servername $1 -connect $1:443 2>/dev/null | openssl x509 -noout -dates | grep notAfter | cut -d "=" -f 2 | xargs -0 date -jf  '%b  %d %T %Y %Z' +'%Y-%m-%d' 2>/dev/null)
# echo exp date is ${exp_date}
warn_date=$(date -jf'%Y-%m-%d'  -v-22d ${exp_date} +'%Y-%m-%d')
# echo warn date is ${warn_date}
if [[ ${warn_date} < $(date -j +'%Y-%m-%d') ]]
then
  echo "**** $1 cert is about to expire ***"
else
  echo "$1 cert is fine."
fi
