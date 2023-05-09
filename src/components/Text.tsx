interface AppTextProps {
  children: any;
  style: string;
}

function AppText({ children, style, ...otherProps }: AppTextProps) {
  return (
    <p className={style} {...otherProps}>
      {children}
    </p>
  );
}

export default AppText;
