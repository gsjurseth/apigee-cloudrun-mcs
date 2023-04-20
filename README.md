# apigee-cloudrun-mcs
A repo demonstrating how one can use the new multi-container feature of Cloud Run to
host a sidecar (envoy) and add Apigee APIM on those services.

## How it works
We have a caller service that will call another named service. This other service will
have both the envoy-adapter and envoy co-located as additional containers. 

## Getting started: 
To get this up and running we need to
* setup the envoy adapter
* figure out your cloud run suffix
* update some files

### setup the envoy adapter
First you will need to follow the instructions and provision the remote service for
the envoy adapter. Once this is done you copy the `config.yaml` file into the envoy-adapter
directory. Update the `buildit.sh` script with your own gcr-location.

Then execute:

```bash
./buildit.sh
```
This will build the docker and provision it to gcr.

### Building the other images
Now for both the caller-service, and simple-service update `buildit.sh` and then build
and provision those images like before by executing:

```bash
./buildit.sh
```
### Update the specs
Finally we need to update the specs. In the repo-root you'll find a `simple-service.yaml`
and a `caller-service.yaml`. Update each of these to your own project setup.

## Deploy the services and set it all up
Now we need an app and apiproduct. Go and configure a product and app. For the product
set the remote-service target name to `simple-service`. You'll note that this service
name is also listed as `TARGET_NAME` in the `simple-service.yaml` file. This configuration
of the serice name in the product, together with the `TARGET_NAME` in the service yaml file
is all that's needed to tie a service back to apigee with the prefconfigured envoy.

After you configure your app copy the key and update the `simple-service.yaml` file 
with the new key and save it.

To get this deploy you will use the `deployIt.sh` script and do the following:

```bash
./deployIt.sh simple-service
./deployIt.sh caller-service
```

## Test it
Now let's see if it works. Execute the following (substitute with your own cloud-run 
suffix:
```bash
curl -i https://caller-service-suffix/callservice/simple-service -H "Authorization: Bearer $(gcloud auth print-identity-token)"
```

You should see traffic on the remote service.
