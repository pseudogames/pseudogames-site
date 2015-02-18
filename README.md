# INSTALL

## /etc/nginx/sites-available/pseudogames
server {
	server_name pseudogames.com;
	root /site/pseudogames;

	rewrite ^/ggj2013/mechabeats\.html$  http://pseudogames.com/release/2013-mechabeats/web/mechabeats.html redirect;
	
	set $uri_dl "$uri:$arg_dl";
	if ( $uri_dl !~ "^/index.html|:1$" ) {
		rewrite ^/(.*\.html)$ /#/$1 redirect;
	}
}

## /etc/nginx/sites-available/9hells
server {
	server_name 9hells.org;
	root /site/9hells;

}

server {
	server_name *.9hells.org;
	return 302 $scheme://pseudogames.com;
}

