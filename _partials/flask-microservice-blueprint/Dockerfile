FROM centos:7
RUN yum update -y && yum install -y epel-release
RUN yum install -y python-pip  # Run updates, install pip
RUN useradd -d /blueprint blueprint  # Create 'blueprint' user
WORKDIR /blueprint

# Add files from host to container dir and set permissions
ADD models error_handling.py requirements.txt development.ini app.py /blueprint/
RUN chown -R blueprint:blueprint /blueprint && chmod ug+x /blueprint/app.py
RUN pip install --upgrade pip
RUN pip install -r /blueprint/requirements.txt

EXPOSE 8080   
USER blueprint
CMD python app.py -c development.ini
