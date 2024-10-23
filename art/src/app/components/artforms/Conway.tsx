"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Mesh } from "three";
import { conwayEngine } from "@/app/lib/renderengines";
import { OrbitControls } from "@react-three/drei";
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'




// const NISSAN_MESH_URL = "/1978-nissan-skyline/1978 Nissan Skyline.zip";



export function ConwayMesh() {
    const mesh = useRef<Mesh>(null!);
    const [grid, setGrid] = useState<boolean[][]>(Array(15).fill(false).map(() => Array(15).fill(false).map(() => Math.random() > 0.5)));
    const updateGrid = () => {
        setGrid((grid) => { console.log("grid", grid); return conwayEngine(grid) });
        setTimeout(() => {
            updateGrid();
        }, 1000);
    }
    useEffect(() => {
        updateGrid();
    }, []);
    // const { scene: nissan } = useGLTF(NISSAN_MESH_URL);
    // useFrame(() => {
    //     mesh.current.rotation.y += 0.01;
    // });

    return (
        <>
            {grid.map((row, i) => row.map((cell, j) => (
                <mesh ref={mesh} position={[i - 7, j - 7, 0]} key={`${i}-${j}`} >
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color={cell ? "hotpink" : "black"} />
                </mesh>
            )))}
        </>
    );
}

export function Conway() {
    return (
        <Canvas style={{ height: '48rem', width: '100%' }}>
            <ambientLight />
            <pointLight position={[15, 15, 15]} />
            <OrbitControls makeDefault position={[40, 30, 30]} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <ConwayMesh />
        </Canvas>
    );
}



