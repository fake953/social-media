import alertFunction from "../../utils/alert";
import { useAppSelector } from "../../services/state/hooks";
import { getImageAddress } from "../../utils/getImageAddress";
import { useDropzone, FileRejection } from "react-dropzone";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreatePostMutation } from "../../services/api/apiQuery";

import {
  AttachmentIcon,
  MicrophoneIcon,
  UploadIcon,
  ImageIcon,
} from "../icons";
import { postType } from "../../Types/postTypes";

type FormFields = {
  description: string;
  mediaAddress: FileRejection;
};
type Props = {
  updatePosts: (post: postType) => void;
};
const CreatePost = ({ updatePosts }: Props) => {
  const { user, token } = useAppSelector((state) => state.user);
  const [createPost] = useCreatePostMutation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormFields>();
  const { getInputProps, getRootProps, acceptedFiles } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg"],
      "image/png": [".png"],
    },
    maxSize: 10 * 1024 * 1024,
  });
  if (!user || !token) {
    alertFunction("create post");
    return;
  }
  const onSubmit: SubmitHandler<FormFields> = async (value) => {
    if (!acceptedFiles[0]) {
      alert("media is required");
      return;
    }
    value.mediaAddress = acceptedFiles[0].path;
    const postParameters = {
      userId: user._id,
      secret: token,
      description: value.description,
      picturePath: value.mediaAddress,
    };
    const res = await createPost(postParameters);
    updatePosts(res.data.data);
    console.log(res.data.data);
    reset();
  };
  console.log(errors);

  return (
    <div className="mb-4 rounded-lg bg-card p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between gap-6 items-center border-b pb-3 border-gray-500">
          <img
            src={getImageAddress(user.picturePath)}
            alt="user photo"
            className="w-12 h-11 object-cover rounded-full"
          />
          <input
            required
            {...register("description")}
            placeholder="What's on your mind..."
            type="text"
            className="text-start focus:ring-4 focus:outline-none bg-input font-medium rounded-full text-sm px-5 py-4 w-full"
          />
        </div>
        <div
          // hidden={true}
          {...getRootProps()}
          className=" border border-white pl-5 p-3 bg-input mt-3 cursor-pointer"
        >
          <input
            {...register("mediaAddress")}
            {...getInputProps()}
            id="picture"
            color="white"
            className="pt-5 pl-3"
          />
          <p>
            {acceptedFiles[0]?.name
              ? acceptedFiles[0]?.name
              : "please drag and drop or just click your media !"}
          </p>
        </div>
        {errors?.mediaAddress && <p>{errors.mediaAddress.message}</p>}

        <div className="flex justify-between mt-3 items-center">
          <div className="flex gap-1 cursor-pointer hover:shadow-xl">
            <ImageIcon />
            <span>Image</span>
          </div>
          <div className="flex gap-1 cursor-pointer hover:shadow-xl">
            <UploadIcon />
            <span>Clip</span>
          </div>
          <div className="flex gap-1 cursor-pointer hover:shadow-xl">
            <MicrophoneIcon />
            <span>Audio</span>
          </div>
          <div className="flex gap-1 cursor-pointer hover:shadow-xl">
            <AttachmentIcon />
            <span>Attachment</span>
          </div>
          <div className="">
            <button
              disabled={isSubmitting}
              type="submit"
              className="text-sm rounded-full py-2 px-4 bg-cyan-500 hover:bg-cyan-400"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
