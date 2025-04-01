import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig'; // Adjust path as needed
import { toast } from 'react-toastify';
import { FaSearch, FaTimes, FaCheck, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const FormTable = () => {
  const [forms, setForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [tempStatuses, setTempStatuses] = useState([]);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const formsPerPage = 5;
  const navigate = useNavigate();

  const statusMap = {
    'Завершено': 'Completed',
    'Ожидает': 'Pending',
    'Не связались': 'Uncontacted',
  };

  const reverseStatusMap = {
    'Completed': 'Завершено',
    'Pending': 'Ожидает',
    'Uncontacted': 'Не связались',
  };

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('/admin/forms', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForms(response.data);
        setFilteredForms(response.data);
      } catch (err) {
        // Error handling is managed by the axios interceptor
      }
    };
    fetchForms();
  }, []);

  const applyFilters = () => {
    let filtered = forms;

    if (searchTerm) {
      filtered = filtered.filter((form) => {
        const firstName = form.firstName || '';
        const lastName = form.lastName || '';
        const email = form.email || '';
        const applicationId = form.applicationId || ''; // Add applicationId for search
        const search = searchTerm.toLowerCase().trim();
        return (
          firstName.toLowerCase().includes(search) ||
          lastName.toLowerCase().includes(search) ||
          email.toLowerCase().includes(search) ||
          applicationId.toLowerCase().includes(search) // Search by applicationId
        );
      });
    }

    if (selectedStatuses.length > 0) {
      const backendStatuses = selectedStatuses.map(status => statusMap[status]);
      filtered = filtered.filter((form) => backendStatuses.includes(form.status || 'Pending'));
    }

    setFilteredForms(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedStatuses, forms]);

  const handleStatusChange = async (id, status) => {
    try {
      const backendStatus = statusMap[status] || status;
      const token = localStorage.getItem('token');
      const response = await axiosInstance.put(
        `/admin/forms/${id}`,
        { status: backendStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForms(forms.map((form) => (form._id === id ? response.data : form)));
      setFilteredForms(filteredForms.map((form) => (form._id === id ? response.data : form)));
      toast.success('Статус успешно обновлен!');
    } catch (err) {
      console.error('Status update error:', err.response?.data || err.message);
      toast.error(err.response?.data?.error || 'Ошибка при обновлении статуса.');
    }
  };

  const toggleStatus = (status) => {
    if (tempStatuses.includes(status)) {
      setTempStatuses(tempStatuses.filter((s) => s !== status));
    } else {
      setTempStatuses([...tempStatuses, status]);
    }
  };

  const handleApplyFilter = () => {
    setSelectedStatuses(tempStatuses);
    setIsFilterDropdownOpen(false);
  };

  const handleResetFilter = () => {
    setTempStatuses([]);
    setSelectedStatuses([]);
    setIsFilterDropdownOpen(false);
  };

  const handleCardClick = (id) => {
    console.log(`Navigating to /form/${id}`);
    navigate(`/form/${id}`);
  };

  // Pagination Logic
  const totalForms = filteredForms.length;
  const totalPages = Math.ceil(totalForms / formsPerPage);
  const startIndex = (currentPage - 1) * formsPerPage;
  const endIndex = startIndex + formsPerPage;
  const currentForms = filteredForms.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="dashboard-container">
      <div className="filter-section">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Поиск по имени или электронной почте..." // Updated placeholder
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="custom-dropdown">
          <button
            className="dropdown-toggle"
            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
          >
            {selectedStatuses.length > 0
              ? `Статусы: ${selectedStatuses.join(', ')}`
              : 'Фильтр по статусу'}
            <span className="dropdown-arrow">▼</span>
          </button>
          {isFilterDropdownOpen && (
            <div className="dropdown-menu">
              <div className="status-options">
                {['Завершено', 'Ожидает', 'Не связались'].map((status) => (
                  <label key={status} className="status-option">
                    <input
                      type="checkbox"
                      checked={tempStatuses.includes(status)}
                      onChange={() => toggleStatus(status)}
                    />
                    <span className="status-label">{status}</span>
                  </label>
                ))}
              </div>
              <div className="dropdown-actions">
                <button className="reset-button" onClick={handleResetFilter}>
                  <FaTimes /> Сбросить
                </button>
                <button className="apply-button" onClick={handleApplyFilter}>
                  <FaCheck /> Применить
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="cards-grid">
        {currentForms.map((form) => (
          <div key={form._id} className="form-card-wrapper">
            <div
              className={`form-card status-${(form.status || 'Pending').toLowerCase()}`}
              onClick={() => handleCardClick(form._id)}
            >
              <div className="status-line"></div>
              <div className="card-content">
                <h3 className="card-title">{`${form.firstName} ${form.lastName}`}</h3>
                <div className="card-details">
                  <p>
                    <strong>ID заявки:</strong> {form.applicationId || 'Отсутствует'} {/* Added applicationId */}
                  </p>
                  <p>
                    <strong>Электронная почта:</strong> {form.email || 'Отсутствует'}
                  </p>
                  <p>
                    <strong>Тип консультации:</strong> {form.consultationType || 'Отсутствует'}
                  </p>
                  <p>
                    <strong>Цена:</strong> {form.researchPrice ? `${form.researchPrice} ₽` : 'Отсутствует'}
                  </p>
                  <div
                    className="status-section"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <strong>Статус:</strong>
                    <select
                      className="status-select"
                      value={reverseStatusMap[form.status] || 'Ожидает'}
                      onChange={(e) => handleStatusChange(form._id, e.target.value)}
                    >
                      <option value="Завершено">Завершено</option>
                      <option value="Ожидает">Ожидает</option>
                      <option value="Не связались">Не связались</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalForms > formsPerPage && (
        <div className="pagination-container">
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaArrowLeft /> Предыдущая
          </button>

          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Следующая <FaArrowRight />
          </button>
        </div>
      )}
      <div className="pagination-info">
        Страница {currentPage} из {totalPages} (Всего форм: {totalForms})
      </div>
    </div>
  );
};

export default FormTable;