"use client";

import { useEffect, useRef } from "react";

type Point = {
    x: number;
    y: number;
    vx: number;
    vy: number;
};

export default function HeroCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const points: Point[] = [];

        for (let i = 0; i < 60; i++) {
            points.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
            });
        }

        function draw(): void {
            ctx?.clearRect(0, 0, width, height);

            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const dx = points[i].x - points[j].x;
                    const dy = points[i].y - points[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150 && ctx) {
                        ctx.strokeStyle = `rgba(0, 200, 255, ${1 - dist / 150})`;
                        ctx.beginPath();
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                        ctx.stroke();
                    }
                }
            }

            for (const p of points) {
                ctx!.fillStyle =
                    (CSS && CSS.supports && CSS.supports("color", "oklch(0.696 0.17 162.48)"))
                        ? "oklch(0.696 0.17 162.48)"
                        : "#3cb4ff";
                ctx?.beginPath();
                ctx?.arc(p.x, p.y, 3, 0, Math.PI * 2);
                ctx?.fill();

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;
            }

            requestAnimationFrame(draw);
        }

        draw();

        const handleResize = (): void => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ display: "block" }} />;
}
