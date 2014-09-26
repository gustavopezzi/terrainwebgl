define(["three", "shader!terrain.vert", "shader!terrain.frag", "texture"],
    function(THREE, terrainVert, terrainFrag, texture) {
        return {
            sky: new THREE.MeshBasicMaterial({
                fog: true,
                map: texture.sky,
                side: THREE.DoubleSide
            }),
            createTerrainMaterial: function(heightData, globalOffset, offset, scale, resolution, edgeMorph) {
                terrainVert.define("TILE_RESOLUTION", resolution.toFixed(1));
                return new THREE.ShaderMaterial({
                    uniforms: {
                        uEdgeMorph: {
                            type: "i", 
                            value: edgeMorph
                        },
                        uGlobalOffset: {
                            type: "v3",
                            value: globalOffset
                        },
                        uHeightData: {
                            type: "t",
                            value: heightData
                        },
                        uTileOffset: {
                            type: "v2",
                            value: offset
                        },
                        uScale: {
                            type: "f",
                            value: scale
                        }
                    },
                    vertexShader: terrainVert.value,
                    fragmentShader: terrainFrag.value
                });
            }
        };
    }
);