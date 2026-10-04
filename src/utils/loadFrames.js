const frames = import.meta.glob(
  "../assets/frames/barbell-loading/*.{png,jpg,jpeg}",
  {
    eager: true,
    import: "default",
  }
);

export default Object.entries(frames)
  .sort(([a], [b]) => {
    const na = Number(a.match(/\((\d+)\)/)?.[1]);
    const nb = Number(b.match(/\((\d+)\)/)?.[1]);
    return na - nb;
  })
  .map(([, value]) => value);