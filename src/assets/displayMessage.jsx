const displayMessage = (data) => {
  if (data.message) {
    return (
      <div className="mx-auto bg-green-100 px-10 py-2 w-fit rounded-lg">
        {data.message}
      </div>
    );
  }
  if (data.errors) {
    const errors = data.errors.map((error, index) => {
      return (
        <div
          key={index}
          className="mx-auto bg-red-100 px-10 py-2 w-fit rounded-lg"
        >
          {error.msg}
        </div>
      );
    });
    return errors;
  }
  if (data.error) {
    if (data.error.message) {
      return (
        <div className="mx-auto bg-red-100 px-10 py-2 w-fit rounded-lg">
          {data.message}
        </div>
      );
    } else if (data.error) {
      return (
        <div className="mx-auto bg-red-100 px-10 py-2 w-fit rounded-lg">
          {data.error}
        </div>
      );
    }
  }
};

export default displayMessage;
