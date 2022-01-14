# Low Pass Filters

A low pass filter allows signals with a low frequency to pass. What does that mean?
Well, data sources often come with noise that we don't want. An example of such
a source is a thermometer, or an accelerometer.

Noise is different for thermometers and accelerometers: a thermometer's
intent is to measure the ambient temperature; thus a lonely spike is bad!
However, for an accelerometer, it is typically the spike itself is what you
want to measure. How can you achieve that?! The answer is filters!

This repository contains a simple server that outputs a binary signal with heavy
noise disrupting it, and a webpage that visualizes the signal sent to it,
and tries to decode the message. 

The task associated with this challenge is to implement a proxy for the server
that will filter out the noise and emit a simple binary signal to the webpage.

## Cloning
The first step to working on this challenge is cloning the repository.
```shell
git clone git@github.com:akainth015/low-pass-filter-demo.git 
```

## Running
There will be 2 or 3 servers running on your computer once this challenge
is complete. You can start the signal server first.
```shell
node noisy_server/index.mjs
PORT=1076 node noisy_server/index.mjs
```

Next, let's see what this noisy signal looks like.
```shell
python3 -m http.server --directory decoder 3000
# open http://localhost:3000 in your browser
```

Now, go ahead and start the denoiser!
```shell
node denoiser/index.mjs
PORT=1077 node denoiser/index.mjs
```

You should see the same signal if you connect to it from the webpage.
Edit `denoiser/index.mjs` to try and fix that! The final output from your
filter should be a `0` or a `1`. Good luck!