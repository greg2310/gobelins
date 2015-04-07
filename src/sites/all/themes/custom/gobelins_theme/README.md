# Grunt base project for HTML integration

## Description

HTML, CSS (SASS) and JS development workflow for HTML integration project.



## Prerequisites

This project requires [node](http://nodejs.org/), [grunt](http://gruntjs.com/) and [compass](http://compass-style.org/).


### Node

#### Node for Debian

Install the following dependencies :
```shell
sudo aptitude install build-essential
```

Download sources and install node :
```shell
cd [path_to_the_nodejs_extract]
./configure
make
sudo make install
```

#### Node for Centos / Red Hat

Install the following dependencies :
```shell
sudo yum install make gcc gcc-c++
```

Download sources and install node :
```shell
cd [path_to_the_nodejs_extract]
./configure
make
sudo make install
```

#### Node for Windows

Download and install through [installer](http://nodejs.org/download/).


### Grunt et Bower

Install grunt and bower commands with npm globally :
```shell
(sudo) npm install -g grunt-cli
(sudo) npm install -g bower
```


### Ruby

#### Ruby for Debian

Install the following dependencies :
```shell
sudo aptitude install git curl
```

Install rvm :
```shell
\curl -#L https://get.rvm.io | bash -s stable --autolibs=3 --ruby
source /usr/local/rvm/scripts/rvm
```

#### Ruby for Centos / Red Hat

Install the following dependencies :
```shell
yum install cmake gcc gcc-c++ openssl-devel libyaml-devel libffi-devel readline-devel zlib-devel gdbm-devel ncurses-devel libicu-devel
```

For development (only) you can install missing packages this way :
```shell
yum localinstall ftp://ftp.free.fr/mirrors/ftp.centos.org/6.6/os/x86_64/Packages/libicu-devel-4.2.1-9.1.el6_2.x86_64.rpm
yum localinstall ftp://ftp.free.fr/mirrors/ftp.centos.org/6.6/os/x86_64/Packages/libyaml-devel-0.1.3-1.4.el6.x86_64.rpm
yum localinstall ftp://ftp.free.fr/mirrors/ftp.centos.org/6.6/os/x86_64/Packages/libffi-devel-3.0.5-3.2.el6.x86_64.rpm
```

Install ruby :
```shell
cd ~
wget http://cache.ruby-lang.org/pub/ruby/2.0/ruby-2.0.0-p594.tar.gz
tar xzf ruby-2.0.0-p594.tar.gz
rm ruby-2.0.0-p594.tar.gz
cd ruby-2.0.0-p594
./configure
make
make install
```

#### Ruby for Windows

Download and install through [installer](http://www.ruby-lang.org/en/downloads/).
Do not forget to select "Add Ruby executables to your PATH" during installation.


### Compass install

Install compass with gem :
```shell
gem update --system
gem install compass
```

#### Linux issues

If you encountered problems with the gem command check the [gnome terminal configuration](https://rvm.io/integration/gnome-terminal/).

It can also come from the configuration files like /root/.bash_profile.
Change the PATH declaration to include itself like this : PATH=$PATH:...
Or add the gems bin directory like this : export PATH=$PATH:/usr/local/rvm/gems/ruby-2.1.3/bin/
Or simply source the .bashrc file :
```
if [ -f ~/.bashrc ]; then
   source ~/.bashrc
fi
```

You may also change the ruby version used by default by your system like this :
```shell
update-alternatives --install /usr/bin/ruby ruby /usr/local/rvm/rubies/ruby-2.1.3/bin/ruby 3
update-alternatives --config ruby
```



## Getting Started

When you have checkout this project you need to install all grunt plugins with :
```shell
cd [project]
npm install
bower install (--allow-root)
```



## Configuration

### grunt.json

You can override default options by creating a file named `grunt.json` at the root of your grunt project.

Each options are described below.

#### `devPath` option

Type: `string`
Default: `app`

One of the main folder of your application containing your development files.

#### `stagingPath` option

Type: `string`
Default: `build`

One of the main folder  of your application containing compiled files.

#### `livereloadPort` option

Type: `int`
Default: `35729`

Port for the livereload server.

#### `connectPort` option

Type: `int`
Default: `9001`

Port for the local server (used for testing).

#### `siteDomain` option

Type: `string`
Default: `localhost`

Domain for the automatic browser opening task.

#### `modernizrPath` option

Type: `string`
Default: `bower_components/modernizr/modernizr.js`

Path to the original modernizr file to create the custom build.

#### `copyFiles` option

Type: `array`
Default: `[]`

List of files to copy from a location to an other.

Usefull to copy needed libraries into the build directory.

For each file you add, specify the source and the destination by using respectively the `src` and the `dest` object keys.

You can use the `devPath` and the `stagingPath` variables within your path by using the [template syntax](http://gruntjs.com/configuring-tasks#templates).

For example :
```json
{
  "copyFiles": [
    {
      "src": "bower_components/jquery-placeholder/jquery.placeholder.js",
      "dest": "<%= stagingPath %>/js/jquery.placeholder.js"
    }
  ]
}
```

You don't need to copy the minified file because it's already managed by the minification process.

By default the jquery library is already included this way.


### .jshintrc

You can override the default jshint options by creating a file named `.jshintrc` at the root of your grunt project.

See [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint) to get more informations about the available options.


### .csslintrc

You can override the default csslint options by creating a file named `.csslintrc` at the root of your grunt project.

See [grunt-contrib-csslint](https://github.com/gruntjs/grunt-contrib-csslint) to get more informations about the available options.



## Running

Try "grunt help" for more information on available tasks.


