/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//==============================================================================

// How to load in modules
const Scene = require('Scene');
const Materials = require('Materials');
const Shaders = require('Shaders');
const Textures = require('Textures');
const Reactive = require('Reactive');

const Time = require('Time');
export const Diagnostics = require('Diagnostics');

Diagnostics.log(`hello world!`);

(async function() {

  // Use export keyword to make a symbol available in scripting debug console
  const material0 = await Materials.findFirst('material0');
  const cameraTexture = await Textures.findFirst('cameraTexture0');
  const cameraColor = cameraTexture.signal;

  function main(){
    Diagnostics.log(`test`);

    const ct = Reactive.mul(Time.ms,0.001);
    const curve = Reactive.abs(Reactive.sin(ct));

    const uvs = Shaders.vertexAttribute({"variableName" : Shaders.VertexAttribute.TEX_COORDS});
    const color = Shaders.textureSampler(cameraColor, uvs);
    const modulationColor = Reactive.pack4(curve,0,0,1);
    const finalColor = Reactive.mul(color, modulationColor);

    const textureSlot = Shaders.DefaultMaterialTextures.DIFFUSE;
    material0.setTextureSlot(textureSlot, finalColor);
  }

  main();

})();
