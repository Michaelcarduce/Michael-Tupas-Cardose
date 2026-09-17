"use client";

import dynamic from "next/dynamic";

// ShaderGradient needs WebGL, so it must be loaded client-only.
const ShaderGradientCanvas = dynamic(
  () => import("@shadergradient/react").then((mod) => mod.ShaderGradientCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-linear-to-br from-purple-900/20 to-blue-900/20 animate-pulse rounded-lg" />
    ),
  },
);
const ShaderGradient = dynamic(
  () => import("@shadergradient/react").then((mod) => mod.ShaderGradient),
  { ssr: false },
);

const HeroGradient = () => (
  <ShaderGradientCanvas
    style={{ position: "absolute", inset: "0", zIndex: "0" }}
    pointerEvents="none">
    <ShaderGradient
      control="query"
      urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.4&cAzimuthAngle=150&cDistance=3.6&cPolarAngle=100&cameraZoom=3.2&color1=%233E269C&color2=%233E269C&color3=%23f4dbff&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=40&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1.5&positionX=-0.5&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=sphere&uAmplitude=1&uDensity=1&uFrequency=5.5&uSpeed=0.1&uStrength=1&uTime=0&wireframe=false"
    />
  </ShaderGradientCanvas>
);

export default HeroGradient;
