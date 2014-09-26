define(["three", "geometry", "material"],
    function(THREE, geometry, material) {
        var Edge = {
            NONE: 0,
            TOP: 1,
            LEFT: 2,
            BOTTOM: 4,
            RIGHT: 8
        };

        // terrain is an extension of Object3D and thus can be added directly to the stage
        var Terrain = function(heightData, worldWidth, levels, resolution) {
            THREE.Object3D.call(this);

            this.worldWidth = (worldWidth !== undefined)? worldWidth : 1024;
            this.levels = (levels !== undefined)? levels : 6;
            this.resolution = (resolution !== undefined)? resolution : 128;
            this.heightData = heightData;

            this.offset = new THREE.Vector3(0, 0, 0);

            // create geometry that we'll use for each tile
            this.tileGeometry = new THREE.PlaneGeometry(1, 1, this.resolution, this.resolution);
            // place origin at bottom left corner rather than center
            var m = new THREE.Matrix4();
            m.makeTranslation(0.5, 0.5, 0);
            this.tileGeometry.applyMatrix(m);

            // create collection of tiles to fill required space
            var initialScale = this.worldWidth / Math.pow(2, levels);

            // create center layer first
            //    +---+---+
            //    | O | O |
            //    +---+---+
            //    | O | O |
            //    +---+---+
            this.createTile(-initialScale, -initialScale, initialScale, Edge.NONE);
            this.createTile(-initialScale, 0, initialScale, Edge.NONE);
            this.createTile(0, 0, initialScale, Edge.NONE);
            this.createTile(0, -initialScale, initialScale, Edge.NONE);

            // create "quadtree" of tiles, with smallest in center
            // each added layer consists of the following tiles (marked 'A'), with the tiles
            // in the middle being created in previous layers
            // +---+---+---+---+
            // | A | A | A | A |
            // +---+---+---+---+
            // | A |   |   | A |
            // +---+---+---+---+
            // | A |   |   | A |
            // +---+---+---+---+
            // | A | A | A | A |
            // +---+---+---+---+
            for (var scale = initialScale; scale < worldWidth; scale *= 2) {
                this.createTile(-2 * scale, -2 * scale, scale, Edge.BOTTOM | Edge.LEFT);
                this.createTile(-2 * scale, -scale, scale, Edge.LEFT);
                this.createTile(-2 * scale, 0, scale, Edge.LEFT);
                this.createTile(-2 * scale, scale, scale, Edge.TOP | Edge.LEFT);

                this.createTile(-scale, -2 * scale, scale, Edge.BOTTOM);
                // 2 tiles 'missing' here are in previous layer
                this.createTile(-scale, scale, scale, Edge.TOP);

                this.createTile(0, -2 * scale, scale, Edge.BOTTOM);
                // 2 tiles 'missing' here are in previous layer
                this.createTile(0, scale, scale, Edge.TOP);

                this.createTile(scale, -2 * scale, scale, Edge.BOTTOM | Edge.RIGHT);
                this.createTile(scale, -scale, scale, Edge.RIGHT);
                this.createTile(scale, 0, scale, Edge.RIGHT);
                this.createTile(scale, scale, scale, Edge.TOP | Edge.RIGHT);
            }
        };

        Terrain.prototype = Object.create(THREE.Object3D.prototype);

        Terrain.prototype.createTile = function(x, y, scale, edgeMorph) {
            var terrainMaterial = material.createTerrainMaterial(
                this.heightData, this.offset,
                new THREE.Vector2(x, y),
                scale,
                this.resolution,
                edgeMorph
           );
            var plane = new THREE.Mesh(this.tileGeometry, terrainMaterial);
            this.add(plane);
        };
        
        return Terrain;
    }
);