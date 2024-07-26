# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  # Configuration de la VM pour PostgreSQL
  config.vm.define "db" do |db|
    db.vm.box = "ubuntu/bionic64" # Image de base de la VM
    db.vm.hostname = "db" # Nom d'hôte de la VM
    db.vm.network "private_network", ip: "192.168.33.10" # Réseau privé avec une IP fixe
    db.vm.network "forwarded_port", guest: 5432, host: 5433, id: "postgres"
    db.vm.provider "virtualbox" do |vb|
      vb.memory = "1024" # Mémoire allouée à la VM
    end
    db.vm.provision "shell", inline: <<-SHELL
      sudo apt-get update
      sudo apt-get install -y postgresql postgresql-contrib
      sudo -u postgres psql -c "CREATE USER vagrant WITH PASSWORD 'vagrant';"
      sudo -u postgres psql -c "CREATE DATABASE vagrant OWNER vagrant;"
      sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/g" /etc/postgresql/10/main/postgresql.conf
      sudo bash -c "echo 'host all all 0.0.0.0/0 md5' >> /etc/postgresql/10/main/pg_hba.conf"
      sudo systemctl restart postgresql
    SHELL
  end

  # Configuration de la VM pour Spring Boot
  config.vm.define "app" do |app|
    app.vm.box = "ubuntu/bionic64"
    app.vm.hostname = "app"
    app.vm.network "private_network", ip: "192.168.33.11"
    app.vm.network "forwarded_port", guest: 8080, host: 8080, id: "tomcat"
    app.vm.provider "virtualbox" do |vb|
      vb.memory = "2048"
    end
    app.vm.provision "shell", inline: <<-SHELL
      sudo apt-get update
      sudo apt-get install -y openjdk-17-jdk
      wget https://archive.apache.org/dist/maven/maven-3/3.8.1/binaries/apache-maven-3.8.1-bin.tar.gz
      tar -xvf apache-maven-3.8.1-bin.tar.gz
      sudo mv apache-maven-3.8.1 /opt/maven
      sudo ln -s /opt/maven/bin/mvn /usr/bin/mvn
      cd /vagrant/vagrant_backend
      mvn clean install
      mvn spring-boot:run
    SHELL
  end

  # Configuration de la VM pour Angular
  config.vm.define "web" do |web|
    web.vm.box = "ubuntu/bionic64"
    web.vm.hostname = "web"
    web.vm.synced_folder ".", "/vagrant"
    web.vm.network "private_network", ip: "192.168.33.12"
    web.vm.provider "virtualbox" do |vb|
    end
    web.vm.provision "shell", inline: <<-SHELL
      sudo apt-get install -y nginx
      sudo apt-get install -y nodejs=20.15.0 npm
      cd /vagrant/vagrant_frontend
      npm install
      npm run build --prod
      sudo cp -r dist/frontend/* /var/www/html/
      sudo systemctl restart nginx
    SHELL
  end
end

