// @ts-nocheck
"use client";

import React, { useRef, useEffect, useState } from "react";

interface SquaresProps {
  direction?: "right" | "left" | "up" | "down";
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  className?: string;
  showGradient?: boolean;
}

const Squares: React.FC<SquaresProps> = ({
  direction = "right",
  speed = 0.5,
  borderColor = "rgba(37, 99, 235, 0.1)", // Subtle Primary Blue
  squareSize = 40,
  hoverFillColor = "rgba(37, 99, 235, 0.05)",
  className = "",
  showGradient = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const gridOffset = useRef({ x: 0, y: 0 });
  const [hoveredSquare, setHoveredSquare] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      ctx.lineWidth = 0.5;
      ctx.strokeStyle = borderColor;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          if (
            hoveredSquare &&
            Math.floor((x + (gridOffset.current.x % squareSize)) / squareSize) === hoveredSquare.x &&
            Math.floor((y + (gridOffset.current.y % squareSize)) / squareSize) === hoveredSquare.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }

      if (showGradient) {
        const gradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)) / 2
        );
        gradient.addColorStop(0, "rgba(0,0,0,0)");
        gradient.addColorStop(1, "rgba(0,0,0,0.8)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    const updateOffset = () => {
      switch (direction) {
        case "right":
          gridOffset.current.x -= speed;
          break;
        case "left":
          gridOffset.current.x += speed;
          break;
        case "up":
          gridOffset.current.y += speed;
          break;
        case "down":
          gridOffset.current.y -= speed;
          break;
      }

      if (Math.abs(gridOffset.current.x) >= squareSize) gridOffset.current.x = 0;
      if (Math.abs(gridOffset.current.y) >= squareSize) gridOffset.current.y = 0;
    };

    const animate = () => {
      updateOffset();
      drawGrid();
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize, hoveredSquare, showGradient]);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const hoveredSquareX = Math.floor((x + (gridOffset.current.x % squareSize)) / squareSize);
    const hoveredSquareY = Math.floor((y + (gridOffset.current.y % squareSize)) / squareSize);

    setHoveredSquare({ x: hoveredSquareX, y: hoveredSquareY });
  };

  const handleMouseLeave = () => {
    setHoveredSquare(null);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`block w-full h-full border-none ${className}`}
    ></canvas>
  );
};

export default Squares;
