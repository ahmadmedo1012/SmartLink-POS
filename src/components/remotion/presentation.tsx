"use client"

import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion"

/* -------------------------------------------------------------------------- */
/*  Brand Intro — Remotion video component                                    */
/*  Resolution: 1080×1080 | 30 fps | 5 sec (150 frames)                       */
/* -------------------------------------------------------------------------- */

function Background() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const scale = interpolate(frame, [0, fps / 2], [1.15, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateRight: "clamp",
  })

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a1200 0%, #2a1f0a 40%, #3a2f1a 100%)",
        transform: `scale(${scale})`,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "60%",
          height: "60%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse at center, rgba(245,158,11,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
    </AbsoluteFill>
  )
}

function LogoMark() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const scale = interpolate(frame, [0, 0.6 * fps], [0, 1], {
    easing: Easing.back(1.4),
    extrapolateRight: "clamp",
  })
  const rotate = interpolate(frame, [0, 0.6 * fps], [-30, 0], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateRight: "clamp",
  })

  return (
    <div
      style={{
        position: "absolute",
        top: "26%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 120,
        height: 120,
        borderRadius: 32,
        background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 60px rgba(245,158,11,0.4), 0 0 120px rgba(245,158,11,0.15)",
        scale: scale,
        rotate: `${rotate}deg`,
      }}
    >
      <span
        style={{
          fontSize: 48,
          fontWeight: 900,
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
          lineHeight: 1,
        }}
      >
        ق
      </span>
    </div>
  )
}

function BrandName() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const opacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  })
  const y = interpolate(frame, [0, 0.5 * fps], [40, 0], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  })

  const letterSpacing = interpolate(frame, [0, fps], [0.15, 0.08], {
    extrapolateRight: "clamp",
  })

  return (
    <h1
      style={{
        position: "absolute",
        top: "44%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: 96,
        fontWeight: 800,
        color: "#fbbf24",
        fontFamily: "system-ui, sans-serif",
        letterSpacing: `${letterSpacing}em`,
        margin: 0,
        textShadow: "0 2px 40px rgba(251,191,36,0.2)",
        opacity,
        translate: `0 ${y}px`,
      }}
    >
      الربط الذكي
    </h1>
  )
}

function Subtitle() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const opacity = interpolate(frame, [0, 0.4 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  })
  const y = interpolate(frame, [0, 0.4 * fps], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  })

  return (
    <p
      style={{
        position: "absolute",
        top: "56%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: 32,
        fontWeight: 500,
        color: "#d4d4d4",
        fontFamily: "system-ui, sans-serif",
        letterSpacing: 2,
        margin: 0,
        whiteSpace: "nowrap",
        opacity,
        translate: `0 ${y}px`,
      }}
    >
      <span style={{ color: "#f59e0b" }}>Smart Link</span>
      {" للأعمال"}
    </p>
  )
}

function DecorativeRing() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const rotation = interpolate(frame, [0, 3 * fps], [0, 360], {
    extrapolateRight: "clamp",
  })
  const opacity = interpolate(frame, [0, fps], [0, 0.15], {
    extrapolateRight: "clamp",
  })

  return (
    <svg
      viewBox="0 0 400 400"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 400,
        height: 400,
        transform: "translate(-50%, -50%)",
        opacity,
      }}
    >
      <circle
        cx="200"
        cy="200"
        r="180"
        fill="none"
        stroke="url(#ring-grad)"
        strokeWidth="0.5"
        strokeDasharray="8 12"
        transform={`rotate(${rotation} 200 200)`}
      />
      <defs>
        <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function BrandIntro() {
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill>
      <Sequence durationInFrames={5 * fps}>
        <Background />
      </Sequence>

      <Sequence from={0} durationInFrames={5 * fps}>
        <DecorativeRing />
      </Sequence>

      <Sequence from={0.3 * fps} durationInFrames={4.7 * fps} layout="none">
        <LogoMark />
      </Sequence>

      <Sequence from={0.8 * fps} durationInFrames={4.2 * fps} layout="none">
        <BrandName />
      </Sequence>

      <Sequence from={1.8 * fps} durationInFrames={3.2 * fps} layout="none">
        <Subtitle />
      </Sequence>
    </AbsoluteFill>
  )
}
