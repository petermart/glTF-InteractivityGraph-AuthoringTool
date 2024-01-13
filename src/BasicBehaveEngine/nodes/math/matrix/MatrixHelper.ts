import {DeepImmutable, Matrix, Vector3, Quaternion} from "@babylonjs/core";

const babylonnnnnn = true;

/*export type Mat3 = [number, number, number, number, number, number, number, number, number];
export type Mat4 = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number,];
export type Vec4 = [number, number, number, number];

export class MatrixHelper {

    static createIdentityMatrix():Mat4 {
        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }
    
    static createTranslationMatrix(tx:number, ty:number, tz:number):Mat4 {
        return [
            1, 0, 0, tx,
            0, 1, 0, ty,
            0, 0, 1, tz,
            0, 0, 0, 1
        ];
    }
    
    static createRotationMatrixFromQuaternion(x:number, y:number, z:number, w:number):Mat4 {
        const length = Math.sqrt(x * x + y * y + z * z + w * w);
        const s = length === 0 ? 1 : 2 / length;
    
        return [
            1 - s * (y * y + z * z), s * (x * y - z * w), s * (x * z + y * w), 0,
            s * (x * y + z * w), 1 - s * (x * x + z * z), s * (y * z - x * w), 0,
            s * (x * z - y * w), s * (y * z + x * w), 1 - s * (x * x + y * y), 0,
            0, 0, 0, 1
        ];
    }

    static mat3ToQuaternion(rotationMatrix: Mat3): Vec4 {
        const trace = rotationMatrix[0] + rotationMatrix[4] + rotationMatrix[8];
        let w, x, y, z;

        if (trace > 0) {
            const s = 0.5 / Math.sqrt(trace + 1);
            w = 0.25 / s;
            x = (rotationMatrix[7] - rotationMatrix[5]) * s;
            y = (rotationMatrix[2] - rotationMatrix[6]) * s;
            z = (rotationMatrix[3] - rotationMatrix[1]) * s;
        } else if (rotationMatrix[0] > rotationMatrix[4] && rotationMatrix[0] > rotationMatrix[8]) {
            const s = 2 * Math.sqrt(1 + rotationMatrix[0] - rotationMatrix[4] - rotationMatrix[8]);
            w = (rotationMatrix[7] - rotationMatrix[5]) / s;
            x = 0.25 * s;
            y = (rotationMatrix[1] + rotationMatrix[3]) / s;
            z = (rotationMatrix[2] + rotationMatrix[6]) / s;
        } else if (rotationMatrix[4] > rotationMatrix[8]) {
            const s = 2 * Math.sqrt(1 + rotationMatrix[4] - rotationMatrix[0] - rotationMatrix[8]);
            w = (rotationMatrix[2] - rotationMatrix[6]) / s;
            x = (rotationMatrix[1] + rotationMatrix[3]) / s;
            y = 0.25 * s;
            z = (rotationMatrix[5] + rotationMatrix[7]) / s;
        } else {
            const s = 2 * Math.sqrt(1 + rotationMatrix[8] - rotationMatrix[0] - rotationMatrix[4]);
            w = (rotationMatrix[3] - rotationMatrix[1]) / s;
            x = (rotationMatrix[2] + rotationMatrix[6]) / s;
            y = (rotationMatrix[5] + rotationMatrix[7]) / s;
            z = 0.25 * s;
        }

        return [x, y, z, w];
    }
    
    static createScaleMatrix(sx:number, sy:number, sz:number):Mat4 {
        return [
            sx, 0, 0, 0,
            0, sy, 0, 0,
            0, 0, sz, 0,
            0, 0, 0, 1
        ];
    }
    
    static multiplyMatrices(a:Mat4, b:Mat4):Mat4 {
        const result:Mat4 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,];
    
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < 4; k++) {
                    result[i * 4 + j] += a[i * 4 + k] * b[k * 4 + j];
                }
            }
        }
    
        return result;
    }

    static magnitude(a:number[]) {
        let total = 0;
        for (let i = 0; i < a.length; i++) {
            total += Math.pow((a[i]),2);
        }
        return Math.sqrt(total);
    }

    static composeMatrix(translation, rotation, scale) {
        const translationMatrix:Mat4 = MatrixHelper.createTranslationMatrix(translation[0], translation[1], translation[2]);
        const rotationMatrix:Mat4 = MatrixHelper.createRotationMatrixFromQuaternion(rotation[0], rotation[1], rotation[2], rotation[3]);
        const scaleMatrix:Mat4 = MatrixHelper.createScaleMatrix(scale[0], scale[1], scale[2]);
        //const identityMatrix = MatrixHelper.createIdentityMatrix();
        let transformMatrix:Mat4 = MatrixHelper.multiplyMatrices(translationMatrix, rotationMatrix);
        transformMatrix = MatrixHelper.multiplyMatrices(transformMatrix, scaleMatrix);
        return transformMatrix;
    }

    static decomposeMatrix(matrix:Mat4) {
        const translation = [matrix[12], matrix[13], matrix[14]];
    
        const scaleX = this.magnitude([matrix[0], matrix[1], matrix[2]]);
        const scaleY = this.magnitude([matrix[4], matrix[5], matrix[6]]);
        const scaleZ = this.magnitude([matrix[8], matrix[9], matrix[10]]);
        const scale = [scaleX, scaleY, scaleZ];
    
        const rotationMatrix:Mat3 = [
            matrix[0] / scaleX, matrix[1] / scaleX, matrix[2] / scaleX,
            matrix[4] / scaleY, matrix[5] / scaleY, matrix[6] / scaleY,
            matrix[8] / scaleZ, matrix[9] / scaleZ, matrix[10] / scaleZ
        ];
    
        const quaternion = this.mat3ToQuaternion(rotationMatrix);
    
        return {
            translation,
            rotation: quaternion,
            scale
        };
    }

    // Consider using babylon js
    static invert4x4(matrix: Mat4): Mat4 {
    const [m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44] = matrix;

    const cofactor11 = m22 * (m33 * m44 - m34 * m43) - m32 * (m23 * m44 - m24 * m43) + m42 * (m23 * m34 - m24 * m33);
    const cofactor12 = -(m21 * (m33 * m44 - m34 * m43) - m31 * (m23 * m44 - m24 * m43) + m41 * (m23 * m34 - m24 * m33));
    const cofactor13 = m21 * (m32 * m44 - m34 * m42) - m31 * (m22 * m44 - m24 * m42) + m41 * (m22 * m33 - m23 * m32);
    const cofactor14 = -(m21 * (m32 * m43 - m33 * m42) - m31 * (m22 * m43 - m23 * m42) + m41 * (m22 * m33 - m23 * m32));

    const determinant = m11 * cofactor11 + m12 * cofactor12 + m13 * cofactor13 + m14 * cofactor14;

    if (determinant === 0) {
        console.error("Matrix is not invertible.");
        return this.createIdentityMatrix(); // Assuming createIdentityMatrix is a valid function in your context
    }

    const inverseDeterminant = 1 / determinant;

    const result: Mat4 = [
        cofactor11 * inverseDeterminant,
        cofactor12 * inverseDeterminant,
        cofactor13 * inverseDeterminant,
        cofactor14 * inverseDeterminant,
        -(m12 * (m33 * m44 - m34 * m43) - m32 * (m13 * m44 - m14 * m43) + m42 * (m13 * m34 - m14 * m33)) * inverseDeterminant,
        m11 * (m33 * m44 - m34 * m43) - m31 * (m13 * m44 - m14 * m43) + m41 * (m13 * m34 - m14 * m33) * inverseDeterminant,
        -(m11 * (m32 * m44 - m34 * m42) - m31 * (m12 * m44 - m14 * m42) + m41 * (m12 * m34 - m14 * m32)) * inverseDeterminant,
        m11 * (m32 * m43 - m33 * m42) - m31 * (m12 * m43 - m13 * m42) + m41 * (m12 * m33 - m13 * m32) * inverseDeterminant,
        m12 * (m23 * m44 - m24 * m43) - m22 * (m13 * m44 - m14 * m43) + m42 * (m13 * m24 - m14 * m23) * inverseDeterminant,
        -(m11 * (m23 * m44 - m24 * m43) - m21 * (m13 * m44 - m14 * m43) + m41 * (m13 * m24 - m14 * m23)) * inverseDeterminant,
        m11 * (m22 * m44 - m24 * m42) - m21 * (m12 * m44 - m14 * m42) + m41 * (m12 * m24 - m14 * m22) * inverseDeterminant,
        -(m11 * (m22 * m43 - m23 * m42) - m21 * (m12 * m43 - m13 * m42) + m41 * (m12 * m23 - m13 * m22)) * inverseDeterminant,
        -(m12 * (m23 * m34 - m24 * m33) - m22 * (m13 * m34 - m14 * m33) + m32 * (m13 * m24 - m14 * m23)) * inverseDeterminant,
        m11 * (m23 * m34 - m24 * m33) - m21 * (m13 * m34 - m14 * m33) + m31 * (m13 * m24 - m14 * m23) * inverseDeterminant,
        -(m11 * (m22 * m34 - m24 * m32) - m21 * (m12 * m34 - m14 * m32) + m31 * (m12 * m24 - m14 * m22)) * inverseDeterminant,
        m11 * (m22 * m33 - m23 * m32) - m21 * (m12 * m33 - m13 * m32) + m31 * (m12 * m23 - m13 * m22) * inverseDeterminant
    ];

    return result;
}
}*/

export class MatrixHelper {

    static createIdentityMatrix():DeepImmutable<Float32Array | Array<number>> {
        return Matrix.Identity().m;
    }
        
    static multiplyMatrices(a:DeepImmutable<Float32Array | Array<number>>, b:DeepImmutable<Float32Array | Array<number>>): DeepImmutable<Float32Array | Array<number>> {
        const A = Matrix.FromArray(a);
        const B = Matrix.FromArray(b);
        const t = A.multiply(B).m
        console.log(t);
        return t;
    }

    static magnitude(a:number[]): number {
        let total = 0;
        for (let i = 0; i < a.length; i++) {
            total += Math.pow((a[i]),2);
        }
        return Math.sqrt(total);
    }

    static composeMatrix(translation: DeepImmutable<Float32Array | Array<number>>, rotation: DeepImmutable<Float32Array | Array<number>>, scale: DeepImmutable<Float32Array | Array<number>>): DeepImmutable<Float32Array | Array<number>> {
        return Matrix.Compose(Vector3.FromArray(scale), new Quaternion(rotation[0], rotation[1], rotation[2], rotation[3]), Vector3.FromArray(translation)).m;
    }

    static decomposeMatrix(matrix: DeepImmutable<Float32Array | Array<number>>) {
        const nodeScale = new Vector3(1, 1, 1);
        const nodeQuaternion = new Quaternion(0, 0, 0, 1);
        const nodeTranslation = new Vector3(0, 0, 0);

        Matrix.FromArray(matrix).decompose(nodeScale, nodeQuaternion, nodeTranslation);
        
        const translation = new Array<number>;
        const scale = new Array<number>;

        nodeTranslation.toArray(translation);
        nodeScale.toArray(scale);
        return {
            translation: translation,
            rotation: [nodeQuaternion.x, nodeQuaternion.y, nodeQuaternion.z, nodeQuaternion.w],
            scale: scale
        };
    }

    // Consider using babylon js
    static invert4x4(matrix: DeepImmutable<Float32Array | Array<number>>) : DeepImmutable<Float32Array | Array<number>> {
        return Matrix.FromArray(matrix).invert().m;
    }
}
