import type { Nullable } from "@babylonjs/core/types";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import type { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Sound } from "@babylonjs/core/Audio/sound";
import { SoundTrack } from "@babylonjs/core/Audio/soundTrack";

import type { IArrayItem, IScene, INode } from "@babylonjs/loaders/glTF/2.0/glTFLoaderInterfaces";
import type { IGLTFLoaderExtension } from "@babylonjs/loaders/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader, ArrayItem } from "@babylonjs/loaders/glTF/2.0/glTFLoader";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";

/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/5d3a2a35d139c72a7001aa4872041572b2e42fae/extensions/2.0/Khronos/KHR_audio/README.md)
 * !!! Experimental Extension Subject to Changes !!!
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
const NAME = "KHR_visibility";
export const KHR_VISIBILITY_EXTENSION_NAME = NAME;


export class KHR_visibility implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    public readonly name:string = NAME;

    /**
     * Defines whether this extension is enabled.
     */
    public enabled: boolean;

    private _loader: GLTFLoader;

    /**
     * @internal
     */
    constructor(loader: GLTFLoader) {
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
    }

    /** @internal */
    public dispose() {
        (this._loader as any) = null;
    }

    /** @internal */
    public onLoading(): void {
        const extensions = this._loader.gltf.extensions;
        /*if (extensions && extensions[this.name]) {
        }*/
    }

    /**
     * @internal
     */
    /*public loadNodeAsync(context: string, node: INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>> {
        return GLTFLoader.LoadExtensionAsync<TransformNode>(context, node, this.name, (extensionContext) => {
            const promises = new Array<Promise<any>>();

            return this._loader
                .loadNodeAsync(extensionContext, node, (babylonMesh) => {
                    const visibility: boolean = node.extensions?.KHR_visibility.visible;
                    const temp:AbstractMesh = babylonMesh as AbstractMesh;
                    temp.visibility = (visibility ? 1 : 0);

                    console.log(node.extensions);
                    console.log(node.extensions?.KHR_visibility.visible)
                })
                .then((babylonMesh) => {
                    return Promise.all(promises).then(() => {
                        return babylonMesh;
                    });
                });
        });
    }*/

    // The logic here is a bit jumbled. Consider fixing.
    public loadNodeAsync(context: string, node: INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>> {
        const isVisible = node.extensions?.[this.name]?.visible ?? true;
    
        // Call the original loadNodeAsync
        const originalLoadNodeAsync = this._loader.loadNodeAsync.bind(this._loader);
        const originalPromise = originalLoadNodeAsync(context, node, (babylonNode) => {
            assign(babylonNode);
            babylonNode.onAfterWorldMatrixUpdateObservable.addOnce(() => {
                babylonNode.setEnabled(isVisible);
            });
          // Assign the modified Babylon node
        });
    
        // Return the original promise
        return originalPromise;
    }
}

GLTFLoader.RegisterExtension(NAME, (loader) => new KHR_visibility(loader));