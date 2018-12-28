<?php

// this is setup to run against an sf.gov dev environment
// it can also be set up to hit live, but at the time of this comment, the rest url doesn't exist

// set some vars
$protocol = 'http://';
$host = 'sfgov.lndo.site';
$path = '/rest/content/services?_format=json';
$url = $protocol . $host . $path;

// do the curl
$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);
$result = json_decode(curl_exec($ch));
curl_close($ch);

// write to file and close
$fileHandle = fopen('tx-metadata.txt', 'w');
$count = count($result);
for($i = 0; $i < $count; $i++) {
  $txNode = $result[$i];
  $funnelbackExternalMetadataLine = 
    str_replace('http:', 'https:', stripslashes($txNode->field_direct_external_url)) . 
    ' sfgovTitle:"' . $txNode->title . '"' .
    ' sfgovSummary:"' . str_replace(array("\r", "\n"), '', $txNode->field_description) . '"' . 
    "\n";
  fwrite($fileHandle, $funnelbackExternalMetadataLine);
}
fclose($fileHandle);