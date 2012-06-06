#!/bin/bash
set -e

# cobia-nvr installation script for Ubuntu

# script should install everything needed to run cobia-nvr
# from a fresh Ubuntu installation with nothng installed

# ./ubuntu-cobia-nvr-install.sh

# tested on the following Ubuntu releases:
# Ubuntu 12.04
# older Ubuntu's, 11.04 and 11.10 do not work because liblivemedia-dev is too old
# you could try to build live555 with vlc if you wanted to use an older Ubuntu

# make sure you have the multiverse repo enabled

# get deps

sudo apt-get install zlib1g-dev libfaad-dev libfaac-dev libmp3lame-dev libxvidcore-dev libpopt-dev libbz2-dev libncurses5-dev libpcap0.8-dev cmake libreadline-dev subversion vim g++ yasm libssl-dev libjpeg-dev libtheora-dev build-essential git-core autoconf libtool libhal-dev libmad0-dev libpostproc-dev libgcrypt11-dev gettext liba52-0.7.4-dev libdvbpsi-dev git build-essential libssl-dev liblivemedia-dev

# build gpac from source

cd
wget http://downloads.sourceforge.net/project/gpac/GPAC/GPAC%200.4.5/gpac-0.4.5.tar.gz
tar xzf gpac-0.4.5.tar.gz 
cd gpac/
sudo chmod +x configure
./configure --use-ffmpeg=no
make lib
sudo make install-lib
sudo ldconfig

# build x264 from source

cd
git clone git://git.videolan.org/x264.git --depth 1
cd x264/
./configure --enable-mp4-output --enable-shared
make
sudo make install
sudo ldconfig

# build ffmpeg from source

cd
git clone git://source.ffmpeg.org/ffmpeg --depth 1
cd ffmpeg
./configure --enable-shared --enable-gpl --enable-nonfree --enable-libfaac --enable-libmp3lame --enable-libtheora --enable-libx264 --enable-libxvid  --enable-pthreads --enable-encoder=mpeg4 --enable-encoder=aac --enable-encoder=ac3
make
sudo make install
sudo ldconfig

# build lua from source

cd
wget http://www.lua.org/ftp/lua-5.1.4.tar.gz
tar xzf lua-5.1.4.tar.gz
cd lua-5.1.4
#make local
sed s/'-O2 -Wall'/'-O2 -fPIC -Wall'/ src/Makefile > /tmp/asdf1234
mv /tmp/asdf1234 src/Makefile
make linux
sudo make install
sudo ldconfig

# build vlc from source

cd
git clone git://git.videolan.org/vlc.git --depth 1
cd vlc
./bootstrap
./configure --enable-faad --enable-merge-ffmpeg --disable-xcb --disable-qt4 --disable-skins2 --disable-alsa --enable-live555
make
sudo make install
sudo ldconfig

# build node

cd
git clone https://github.com/joyent/node.git
cd node
./configure
make
sudo make install
sudo ldconfig

# get cobia-nvr

cd
git clone https://github.com/cobianet/cobia-nvr.git
cd cobia-nvr

echo "###########################################"
echo "########## cobia-nvr install done #########"
echo "###########################################"
echo ""
echo "edit config.js and run \"node app.js\" to start cobia-nvr"
