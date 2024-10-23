"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Mesh } from "three";
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'




// const NISSAN_MESH_URL = "/1978-nissan-skyline/1978 Nissan Skyline.zip";



export function ConwayMesh() {
    const mesh = useRef<Mesh>(null!);

    // const { scene: nissan } = useGLTF(NISSAN_MESH_URL);
    // useFrame(() => {
    //     mesh.current.rotation.y += 0.01;
    // });

    return (
        <mesh ref={mesh}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="hotpink" />
            {/* <primitive object={nissan} /> */}
        </mesh>
    );
}

export function Conway() {
    return (
        <Canvas style={{ height: '100%', width: '100%' }}>
            <ConwayMesh />
        </Canvas>
    );
}



