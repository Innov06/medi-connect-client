import { useTranslation } from "react-i18next";

function TriageForm({ handleSubmit }) {
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit}>
      <br />
      <br />

      <label>{t("question1")}</label>
      <br />
      <select>
        <option>{t("yes")}</option>
        <option>{t("no")}</option>
      </select>

      <br />
      <br />

      <label>{t("question2")}</label>
      <br />
      <select>
        <option>{t("yes")}</option>
        <option>{t("no")}</option>
      </select>

      <br />
      <br />

      <label>{t("question3")}</label>
      <br />
      <select>
        <option>{t("yes")}</option>
        <option>{t("no")}</option>
      </select>

      <br />
      <br />

      <button type="submit">{t("submit")}</button>
    </form>
  );
}

export default TriageForm;