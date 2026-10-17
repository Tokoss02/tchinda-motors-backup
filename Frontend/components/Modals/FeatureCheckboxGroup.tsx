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
}: FeatureCheckboxGroupProps) => {
  const allSelected = selected.length === featureList.length;
  const partiallySelected = selected.length > 0 && !allSelected;

  const toggleSelectAll = () => {
    if (allSelected) {
      onChange([]); // deselect all
    } else {
      onChange([...featureList]); // select all
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label fw-bold">{title}</label>

      {/* Select All / Deselect All */}
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id={`select-all-${title}`}
          checked={allSelected}
          ref={(el) => {
            if (el) el.indeterminate = partiallySelected;
          }}
          onChange={toggleSelectAll}
        />
        <label className="form-check-label" htmlFor={`select-all-${title}`}>
          {allSelected ? 'Deselect All' : 'Select All'}
        </label>
      </div>

      <div className="row">
        {featureList.map((feature) => (
          <div className="col-4" key={feature}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`feature-${title}-${feature}`}
                checked={selected.includes(feature)}
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...selected, feature]
                    : selected.filter((f) => f !== feature);
                  onChange(updated);
                }}
              />
              <label
                className="form-check-label"
                htmlFor={`feature-${title}-${feature}`}
              >
                {feature}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCheckboxGroup;
