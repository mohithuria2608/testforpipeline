
#!/bin/bash
args=("$@")

function goto
{
label=$1
cmd=$(sed -n "/$label:/{:a;n;p;ba};" $0 | grep -v ':$')
eval "$cmd"
exit
}

cd frontend && docker build . -t frontend52
cd ..
cd auth && docker build . -t auth
cd ..
cd songs && docker build . -t songs52
cd ..
cd router && docker build . -t mynginx52
cd ..
cd playlist && docker build . -t playlist52
cd ..