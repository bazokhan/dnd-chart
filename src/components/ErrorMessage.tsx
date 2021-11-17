type Props = {
  error?: Error;
};

const ErrorMessage: React.FC<Props> = ({ error }) => (
  <div className="px-4 py-2 text-red-400 font-xs font-bold">
    {error?.message || 'Something went wrong'}
  </div>
);

export default ErrorMessage;
