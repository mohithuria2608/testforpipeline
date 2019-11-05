
#!/bin/bash
args=("$@")

function goto
{
label=$1
cmd=$(sed -n "/$label:/{:a;n;p;ba};" $0 | grep -v ':$')
eval "$cmd"
exit
}

cd auth-service && sudo docker build . -t auth
cd ..
cd users-service && sudo docker build . -t user
cd ..
cd menu-service && sudo docker build . -t menu
cd ..
cd router && sudo docker build . -t mynginx
cd ..