"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Mesh } from "three";
import { conwayEngine, countNeighbors } from "@/app/lib/renderengines";
import { OrbitControls } from "@react-three/drei";

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
    return (
        <>
            {grid.map((row, i) => row.map((cell, j) => {
                const neighbors = countNeighbors(i, j, grid);
                let color = "#8B4513"; // Default brown
                switch (neighbors) {
                    case 0:
                        color = "#654321"; // Dark brown
                        break;
                    case 1:
                        color = "#8B7355"; // Light brown
                        break;
                    case 2:
                        color = "#A0522D"; // Sienna brown
                        break;
                    case 3:
                        color = "#87CEEB"; // Sky blue
                        break;
                    case 4:
                        color = "#4682B4"; // Steel blue
                        break;
                    case 5:
                        color = "#2E4C1F"; // Dark forest green
                        break;
                    case 6:
                        color = "#3E885B"; // Medium sea green
                        break;
                    case 7:
                        color = "#4FB477"; // Light green
                        break;
                    case 8:
                        color = "#71B48D"; // Sage green
                        break;
                    default:
                        color = "#8B4513"; // Saddle brown
                }
                return (
                    <mesh ref={mesh} position={[i - 7, j - 7, 0]} key={`${i}-${j}`} >
                        <boxGeometry args={[1, 1, !cell ? 1 : neighbors + 1]} />
                        <meshStandardMaterial color={color} />
                    </mesh>
                );
            }))}
            {grid.map((row, i) => row.map((cell, j) => {
                return (<>
                    {cell && <mesh ref={mesh} position={[i - 7, j - 7, 0]} key={`${i}-${j}`} >
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color={"#2E4C1F"} />
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



