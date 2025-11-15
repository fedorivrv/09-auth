"use client";

interface Props {
  error: Error;
}

export default function Error({ error }: Props) {
  return <p>Could not fetch note details. {error.message}</p>;
}
