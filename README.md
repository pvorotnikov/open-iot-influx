# open-iot-influx
Influx persistency plugin for Open IoT.

# Arguments
The arguments object defined in the integration step is passed as property
of the `context` object. The plugin does not support arguments.

# How to pack
This package is bundled using the `npm pack` command that produces
a tarball of the package. It is then converted to zip archive using
a convert utiltity script (`utils/convert.sh`)
```fish
npm pack
```

In order to configure what to pack, edit `.npmignore` to exclude unwanted content.
Edit `bundleDependencies` directive in `package.json` to bundle your dependencies in the package.

# How to publish
This package comes with publish utility script that will upload the latest
version of the package to the Open IoT host.
```fish
set -x ACCESS_KEY <access key>
set -x SECRET_KEY <secret key>
set -x IOT_HOST <iot host>
./utils/publish.sh net.vorotnikov.influx-1.0.0.zip $IOT_HOST $ACCESS_KEY $SECRET_KEY
```

# How to set up InfluxDB instance
Follow the instructions in [Open IoT Wiki article](https://github.com/pvorotnikov/open-iot/wiki/Influx-Integration)
