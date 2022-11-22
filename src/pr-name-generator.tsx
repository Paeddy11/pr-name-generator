import cls from 'classnames';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { formatStoryId, formatStoryName } from './formatStringFunctions';
import { prName } from './types/prName';

const PrNameGenerator: FC = () => {
  const [fullPrName, setFullPrName] = useState('');
  const [copyButtonText, setCopyButtonText] = useState('Copy');
  const [prName, setPrName] = useState<prName>({
    pullRequestType: '',
    storyId: '',
    storyName: '',
  });
  const MAX_PR_LENGTH = 54;
  const isPrNameIsTooLong = fullPrName.length > MAX_PR_LENGTH;
  const prNameTooLongText = `${fullPrName.length} and therefore more than the allowed ${MAX_PR_LENGTH} characters. Plz truncate the pr name while keeping full words`;

  const onHandleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setPrName((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const combinePrName = () => {
    const { pullRequestType, storyId, storyName } = prName;
    const formattedStoryName = formatStoryName(storyName);
    const formattedStoryId = formatStoryId(storyId);

    setFullPrName(
      `${pullRequestType}/${formattedStoryId}-${formattedStoryName}`,
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    combinePrName();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fullPrName);
    setCopyButtonText('PR Name Copied');
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="form w-3/4 flex flex-col m-5 p-5 text-left "
      >
        <div className="m-4 flex">
          <label htmlFor="pullRequestType" className="pr-5 w-1/4 font-semibold">
            PR Type:
          </label>
          <select
            name="pullRequestType"
            id="pullRequestType"
            required
            className="w-3/4 bg-white pl-5"
            placeholder="-----"
            onChange={onHandleChange}
          >
            <option value="" disabled selected>
              ---
            </option>
            <option value="feature">feature</option>
            <option value="bugfix">bugfix</option>
            <option value="hotfix">hotfix</option>
            <option value="release">release</option>
            <option value="epic">epic</option>
          </select>
        </div>
        <div className="m-4">
          <label htmlFor="storyId" className="w-1/4 pr-5 font-semibold">
            Jira Story ID:
          </label>
          <input
            type="text"
            name="storyId"
            id="storyId"
            onChange={onHandleChange}
            aria-label="Jira Story ID"
            placeholder="ECH-1111"
            required
            pattern="\s*[A-Za-z]*-[0-9]*\s*"
            className="pl-5 w-3/4 float-right"
          ></input>
        </div>
        <div className="m-4">
          <label htmlFor="storyName" className="w-1/4 pr-5 font-semibold">
            Jira Story Name:
          </label>
          <input
            type="text"
            name="storyName"
            id="storyName"
            onChange={onHandleChange}
            aria-label="Jira Story Name"
            placeholder="Implement paging"
            required
            className="pl-5 w-3/4 float-right"
          ></input>
        </div>
        <div className="self-center">
          <input
            type="submit"
            value="Generate PR Name"
            className="text-white bg-blue-500 rounded py-1 px-2"
          ></input>
        </div>
      </form>
      <div className="p-4 flex flex-col">
        <div>
          <span className="text-xl text-blue-500">{fullPrName}</span>
          {fullPrName && !isPrNameIsTooLong && (
            <button
              type="submit"
              onClick={handleCopy}
              className="text-white bg-blue-500 rounded ml-4 py-1 px-2"
            >
              {copyButtonText}
            </button>
          )}
        </div>
        <span className={cls('ml-5', isPrNameIsTooLong && 'text-red-500')}>
          Length of PR is{' '}
          {isPrNameIsTooLong ? prNameTooLongText : fullPrName.length}{' '}
        </span>
      </div>
    </>
  );
};

export default PrNameGenerator;
