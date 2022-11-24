CI=true CI_BUILD_NUMBER=$( date '+%F_%H:%M:%S' ) testspace config url $STRIDESPACE_TOKEN:@munderseth.stridespace.com --repo=none
testspace junit.xml @./screenshots-list.txt ?finish