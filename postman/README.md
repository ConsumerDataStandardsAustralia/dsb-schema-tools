# Postman Collection Test Suite

## Overview
This repository contains a Postman collection with a set of unit tests, which can be used as a development testing tool for data holders developing a DSB compliant API.

Additionally, this repository contains the individual schema validation files for the DSB published APIs as well as the utility used to extract those files from the published standard in ConsumerDataStandardsAustralia/standards repository (cds_full.json)


### Using the Postman collection
1. Download the 
```
CDR Banking Sector Conformance Tests vX.XX.X.postman.json
```
This file contains the API unit tests and can be run as a test suite (Postman Collection Runner)

2. Edit the file for your particular data holder server
```
template-postman-variables.json
```
is designed to be used in the Postman collection test runner. Specify the data holder specific parameters and read into the postman collection prior to the test run.

The number of tests run will be determined by the values provided in this file. Eg, if no account ids are provided, any test requiring such a parameter will be skipped.

3. In Postman at the collection level, click on **Run Collection**

![plot](./images/Pm_Screen2.jpg)

4. Click on **Select File** and read in the file created in Step 2.
   
![plot](./images/Pm_Screen3.jpg)   

Click [here](https://learning.postman.com/docs/running-collections/working-with-data-files/#:~:text=When%20you%20initiate%20a%20collection,file%20before%20starting%20the%20run) for information on how to use data files in a Postman collection.

**Note the the order of the tests is important. Do not change**

*The file dsb-dhserver-postman-variables.json
is configured to work with the published data-holder server maintained by DSB and available in the ConsumerDataStandardsAustralia/java-artefacts repository.*

