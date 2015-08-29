# eko
eko listens for log events to come in over HTTP and then repeats them on the command line.

## Installation

```bash
$ npm install -g eko
```

This will install socket.io as a dependency which may generate some safe to
ignore errors trying to compile.

## Quick Start

```bash
$ eko
GET http://localhost:4561/
POST http://localhost:4560/
```

## NLog
To echo NLog events to the console use the following target:

``` xml
  <target name="eko" xsi:type="WebService" methodName=""
  	 protocol="HttpPost"
  	 url="http://localhost:4560">
    <parameter name='level' layout='${level}'/>
    <parameter name='message' layout='${message}'/>
    <parameter name='logger' layout='${logger}'/>
  </target>
```
