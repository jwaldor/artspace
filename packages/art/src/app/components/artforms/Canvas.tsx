import { calculateRectangleDrawType } from '@/app/lib/canvasEngine';
import React, { useRef, useEffect, useState } from 'react';


const LINE_HEIGHT = 10;
export type RectangleDrawType = { x: number, y: number, angleInDegrees: number, color: string, width: number }
export type RectangleStoreType = { x: number, y: number, color: string, width: number }
export function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [rectangles, setRectangles] = useState<RectangleDrawType[]>([]);
    const [isDrawing, setIsDrawing] = useState(false);

    // Add mouse event handlers
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleMouseDown = () => setIsDrawing(true);
        const handleMouseUp = () => setIsDrawing(false);
        const handleMouseMove = (event: MouseEvent) => {
            if (!isDrawing) return;

            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            setRectangles(prev => [...prev, {
                x,
                y,
                angleInDegrees: 0, // You can modify this as needed
                color: 'blue', // You can modify this as needed
                width: 10 // You can modify this as needed
            }]);
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseUp);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseUp);
        };
    }, [isDrawing]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Function to draw a rotated rectangle
        function drawRotatedRectangle(rectangle: RectangleDrawType) {
            // Convert degrees to radians
            const angleInRadians = rectangle.angleInDegrees * (Math.PI / 180);

            // Save the current canvas state
            ctx.save();

            // Translate to the center of the rectangle
            ctx.translate(rectangle.x, rectangle.y);

            // Rotate the canvas
            ctx.rotate(angleInRadians);

            // Draw the rectangle
            ctx.fillStyle = rectangle.color;
            ctx.fillRect(-rectangle.width / 2, -LINE_HEIGHT / 2, rectangle.width, LINE_HEIGHT);

            // Restore the canvas state
            ctx.restore();
        }
        const drawRectangles = calculateRectangleDrawType(rectangles);
        drawRectangles.forEach(drawRotatedRectangle);
        // Draw multiple rectangles with different positions and rotations
        // drawRotatedRectangle({ x: 100, y: 100, angleInDegrees: 20, color: 'blue', width: 10 });
        // drawRotatedRectangle({ x: 200, y: 200, angleInDegrees: 45, color: 'red', width: 10 });
        // drawRotatedRectangle({ x: 300, y: 150, angleInDegrees: 60, color: 'green', width: 10 });
        // drawRotatedRectangle({ x: 250, y: 300, angleInDegrees: 15, color: 'purple', width: 10 });
    }, [rectangles]);

    return <canvas ref={canvasRef} width="500" height="500"></canvas>;
}

