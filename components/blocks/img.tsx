

export const img = (props: any) => (
  <span className="flex items-center justify-center">
    <img
      src={props.url}
      alt={props.alt}
      className="object-cover w-full aspect-auto"
    />
  </span>
);
