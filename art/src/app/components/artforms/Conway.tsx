"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Mesh } from "three";
import { conwayEngine, countNeighbors } from "@/app/lib/renderengines";
import { OrbitControls } from "@react-three/drei";
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'




// const NISSAN_MESH_URL = "/1978-nissan-skyline/1978 Nissan Skyline.zip";

// Pulsar pattern initial state
const pulsar = [
    [false, false, true, true, true, false, false, false, true, true, true, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false],
    [true, false, false, false, false, true, false, true, false, false, false, false, true],
    [true, false, false, false, false, true, false, true, false, false, false, false, true],
    [true, false, false, false, false, true, false, true, false, false, false, false, true],
    [false, false, true, true, true, false, false, false, true, true, true, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, true, true, true, false, false, false, true, true, true, false, false],
    [true, false, false, false, false, true, false, true, false, false, false, false, true],
    [true, false, false, false, false, true, false, true, false, false, false, false, true],
    [true, false, false, false, false, true, false, true, false, false, false, false, true],
    [false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, true, true, true, false, false, false, true, true, true, false, false]
];

// Helper to create initial grid with pulsar
const createPulsarGrid = (size: number = 15): boolean[][] => {
    const grid = Array(size).fill(false).map(() => Array(size).fill(false));
    const offset = Math.floor((size - pulsar.length) / 2);

    for (let i = 0; i < pulsar.length; i++) {
        for (let j = 0; j < pulsar[0].length; j++) {
            grid[i + offset][j + offset] = pulsar[i][j];
        }
    }
    return grid;
};



export function ConwayMesh() {
    const mesh = useRef<Mesh>(null!);
    const [grid, setGrid] = useState<boolean[][]>(pulsar);
    const updateGrid = () => {
        setGrid((grid) => { console.log("grid", grid); return conwayEngine(grid) });
        setTimeout(() => {
            updateGrid();
        }, 3000);
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
            {grid.map((row, i) => row.map((cell, j) => {
                const neighbors = countNeighbors(i, j, grid);
                let color = "hotpink";
                switch (neighbors) {
                    case 0:
                        color = "red";
                        break;
                    case 1:
                        color = "orange";
                        break;
                    case 2:
                        color = "yellow";
                        break;
                    case 3:
                        color = "green";
                        break;
                    case 4:
                        color = "blue";
                        break;
                    case 5:
                        color = "purple";
                        break;
                    case 6:
                        color = "pink";
                        break;
                    case 7:
                        color = "white";
                        break;
                    case 7:
                        color = "brown";
                        break;
                    default:
                        color = "hotpink";
                }
                return (
                    <mesh ref={mesh} position={[i - 7, j - 7, !cell ? 0 : neighbors]} key={`${i}-${j}`} >
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color={color} />
                    </mesh>
                );
            }))}
            {grid.map((row, i) => row.map((cell, j) => {
                return (<>
                    {cell && <mesh ref={mesh} position={[i - 7, j - 7, 0]} key={`${i}-${j}`} >
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color={"red"} />
                    </mesh>}
                </>
                );
            }))}
        </>
    );
}

export function Conway() {
    return (
        <Canvas style={{ height: '48rem', width: '100%' }}>
            <ambientLight />
            <pointLight position={[15, 15, 15]} />
            <OrbitControls makeDefault position={[0, 0, 0]} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <ConwayMesh />
        </Canvas>
    );
}



