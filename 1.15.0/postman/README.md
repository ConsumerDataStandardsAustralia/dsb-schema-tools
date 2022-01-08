# Postman Collection Test Suite


## Using the Postman collection
```
CDR Banking Sector Conformance Tests vX.XX.X.postman.json
```
This Postman collection contains the API unit tests and can be run as a test suite (Postman Collection Runner). This will run all tests for the number of iterations specified in the * .collection-run.postman.json* file. Each array element will trigger a collection run.

The collection can also be run against an environment defined in * .postman-environment.json*.

---

### Using the Postman Collection Runner
To run the Postman collection as a test suite edit the file for your particular data holder server
```
TEMPLATE.collection-run.postman.json
```
is designed to be used in the Postman collection test runner. Specify the data holder specific parameters and read into the postman collection prior to the test run.

The number of tests run will be determined by the values provided in this file. Eg, if no account ids are provided, any test requiring such a parameter will be skipped.

In Postman at the collection level, click on **Run Collection**

<span><img src="https://raw.githubusercontent.com/ConsumerDataStandardsAustralia/dsb-schema-tools/main/postman/images/Pm_Screen1.JPG?token=AETEGILKIOYBMKKWQT2M253BBBXHW" width="300" >

<img src="https://raw.githubusercontent.com/ConsumerDataStandardsAustralia/dsb-schema-tools/main/postman/images/Pm_Screen2.JPG?token=AETEGIJWGTT5AL4ZHY3ZSUDBBHFCO" width="600" ></span>



Click on **Select File** and read your xxx.collection-run.postman.json with the values set specifically for the data holder server this is to be run against.
   

<img src="https://raw.githubusercontent.com/ConsumerDataStandardsAustralia/dsb-schema-tools/main/postman/images/Pm_Screen3.JPG?token=AETEGIOY7XKDOYL4TZHXQKLBBHVBE" width=600>


For more information on the Postman Collection Runner and how to use it look [here](https://learning.postman.com/docs/running-collections/intro-to-collection-runs/).
**Note the the order of the tests is important if this is run in the collection runner. Do not change**

---

### Using a Postman environment

The API tests can also be run in conjunction with the *xxx.postman_environment.json* configuration file. Similarily to the *xxx.collection-run.postman.json* file this can be configured for a specific data holder server.

To achieve this import the configured *xxx.postman_environment.json* as an Environment in Postman.

<img src="https://raw.githubusercontent.com/ConsumerDataStandardsAustralia/dsb-schema-tools/main/postman/images/PM_Screen4.JPG?token=AETEGIINYZ5ZM634AFT6ZITBBH4Y4" width=600>

---


# DSB Postman Tool - Registration API

These can be used to validate a Register API against published DSB schemas.

How to use:

- import the Postman collection (CDR Register API Conformance.postman_collection) into Postman
- import the Postman environment (ACCC Register.postman_environment) into Postman
- change the parameters in the Postman environment to suit the Register API being interrogated
- run the Postman collection

*Note:* The file *ACCC Register.postman_environment.json* is a Postman environment which utilises the current ACCC Register API.

*The files DSB.collection-run.postman.json and DSB.postman_environment.json
are configured to work with the published data-holder server maintained by DSB and available in the ConsumerDataStandardsAustralia/java-artefacts repository.*


