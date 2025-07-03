type FeatureCheckboxGroupProps = {
  title: string;
  featureList: string[];
  selected: string[];
  onChange: (updated: string[]) => void;
};


const FeatureCheckboxGroup = ({
  title,
  featureList,
  selected,
  onChange,
}: FeatureCheckboxGroupProps) => (
  <div className="mb-3">
    <label className="form-label fw-bold">{title}</label>
    <div className="row">
      {featureList.map((feature) => (
        <div className="col-4" key={feature}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`feature-${feature}`}
              checked={selected.includes(feature)}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...selected, feature]
                  : selected.filter((f) => f !== feature);
                onChange(updated);
              }}
            />
            <label className="form-check-label" htmlFor={`feature-${feature}`}>
              {feature}
            </label>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FeatureCheckboxGroup;