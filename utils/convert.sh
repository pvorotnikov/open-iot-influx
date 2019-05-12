#!/bin/bash
# Convert tgz package produced by `npm pack`
# to a zip package recognized by openiot (plugin)

TMPDIR=`mktemp -d`

# Copy the tar to the temporary directory
cp "$1" $TMPDIR/

# Untar
(cd $TMPDIR && tar -xzf "$1")

# Remove the original zipfile because we don't want that to be tar'd
rm "$TMPDIR/$1"

# Zip the files
outfilename=$(echo "$1" | rev | cut -d. -f2- | rev).zip
(cd $TMPDIR/package && zip -qr "../$outfilename" *)
mv "$TMPDIR/$outfilename" .

# Remove the temporary directory
rm -rf $TMPDIR

#Print what we did
echo "Converted $1 to $outfilename"