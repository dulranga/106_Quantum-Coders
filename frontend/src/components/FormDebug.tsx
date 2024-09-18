import FormItem from "antd/es/form/FormItem";

const FormDebug = () => {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <FormItem shouldUpdate>
      {({ getFieldsValue }) => {
        return (
          <pre className="max-w-[50vw]">
            {JSON.stringify(getFieldsValue(), null, 2)}
          </pre>
        );
      }}
    </FormItem>
  );
};

export default FormDebug;
