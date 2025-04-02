import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaTrash, FaFileAlt } from 'react-icons/fa';
import Navbar from './Navbar';

const FormDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [status, setStatus] = useState('');
  const [hoveredNote, setHoveredNote] = useState(null);
  const [hoveredFile, setHoveredFile] = useState(null);

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
    const fetchForm = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`/admin/forms/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm(response.data);
        setStatus(response.data.status || 'Pending');
      } catch (err) {
        // Error handling is managed by the axios interceptor
      }
    };
    fetchForm();
  }, [id, navigate]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const backendStatus = statusMap[newStatus] || newStatus;
      const token = localStorage.getItem('token');
      const response = await axiosInstance.put(
        `/admin/forms/${id}`,
        { status: backendStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForm(response.data);
      setStatus(backendStatus);
      toast.success('Статус успешно обновлен!');
    } catch (err) {
      console.error('Status update error:', err.response?.data || err.message);
      toast.error(err.response?.data?.error || 'Ошибка при обновлении статуса.');
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      const token = localStorage.getItem('token');
      const updatedNotes = form.notes ? `${form.notes}\n${newNote.trim()}` : newNote.trim();
      const response = await axiosInstance.put(
        `/admin/forms/${id}`,
        { notes: updatedNotes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForm(response.data);
      setNewNote('');
      toast.success('Заметка успешно добавлена!');
    } catch (err) {
      // Error handling is managed by the axios interceptor
    }
  };

  const handleDeleteNote = async (indexToDelete) => {
    try {
      const token = localStorage.getItem('token');
      const notesArray = form.notes ? form.notes.split('\n').filter(note => note.trim()) : [];
      const updatedNotesArray = notesArray.filter((_, index) => index !== indexToDelete);
      const updatedNotes = updatedNotesArray.length > 0 ? updatedNotesArray.join('\n') : '';
      const response = await axiosInstance.put(
        `/admin/forms/${id}`,
        { notes: updatedNotes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForm(response.data);
      toast.success('Заметка успешно удалена!');
    } catch (err) {
      // Error handling is managed by the axios interceptor
    }
  };

  if (!form) {
    return <div>Загрузка...</div>;
  }

  const isTrustee = form.relationToPatient === "Я доверенное лицо";
  const notesArray = form.notes ? form.notes.split('\n').filter(note => note.trim()) : [];
  const medicalFiles = Array.isArray(form.medicalFiles) ? form.medicalFiles : [];

  return (
    <div className="dashboard">
      <Navbar showLogout={true} />
      <div className="form-details-container">
        <div className="form-details-header">
          <button className="back-button" onClick={() => navigate('/dashboard')}>
            <FaArrowLeft /> Назад к панели управления
          </button>
        </div>
        <div className="form-details-card">
          <h2 className="form-details-title">
            {`${form.lastName}${form.firstName}${form.middleName || ''} (${form.applicationId})`}
          </h2>
          <div className="form-details-content">
            <div className="details-section">
              <h3>Статус и дата подачи</h3>
              <div className="detail-item">
                <strong>Статус:</strong>
                <select
                  className="status-select"
                  value={reverseStatusMap[status] || 'Ожидает'}
                  onChange={handleStatusChange}
                >
                  <option value="Завершено">Завершено</option>
                  <option value="Ожидает">Ожидает</option>
                  <option value="Не связались">Не связались</option>
                </select>
              </div>
              <div className="detail-item">
                <strong>Дата подачи:</strong>
                <span>{new Date(form.submittedAt).toLocaleString('ru-RU', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}</span>
              </div>
            </div>

            <div className="details-section">
              <h3>{isTrustee ? "Информация о доверенном лице" : "Информация о пациенте"}</h3>
              {isTrustee && (
                <>
                  <div className="detail-item">
                    <strong>Фамилия доверенного лица:</strong>
                    <span>{form.trusteeSurname || <span className="empty-field">Отсутствует</span>}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Имя доверенного лица:</strong>
                    <span>{form.trusteeName || <span className="empty-field">Отсутствует</span>}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Отчество доверенного лица:</strong>
                    <span>{form.trusteePatronymic || <span className="empty-field">Отсутствует</span>}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Телефон доверенного лица:</strong>
                    <span>{form.trusteePhoneNumber || <span className="empty-field">Отсутствует</span>}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Электронная почта доверенного лица:</strong>
                    <span>{form.trusteeEmail || <span className="empty-field">Отсутствует</span>}</span>
                  </div>
                </>
              )}
              <div className="detail-item">
                <strong>Фамилия:</strong>
                <span>{form.lastName || <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Имя:</strong>
                <span>{form.firstName || <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Отчество:</strong>
                <span>{form.middleName || <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Пол:</strong>
                <span>{form.gender === "Male" ? "Мужской" : form.gender === "Female" ? "Женский" : <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Дата рождения:</strong>
                <span>{form.dateOfBirth ? new Date(form.dateOfBirth).toLocaleDateString('ru-RU') : <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Возраст:</strong>
                <span>{form.age || <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Отношение к пациенту:</strong>
                <span>{form.relationToPatient || <span className="empty-field">Отсутствует</span>}</span>
              </div>
            </div>

            <div className="details-section">
              <h3>Контактная информация</h3>
              <div className="detail-item">
                <strong>Электронная почта:</strong>
                <span>{form.email || <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Номер телефона:</strong>
                <span>{form.phoneNumber || <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Город:</strong>
                <span>{form.city || <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Улица:</strong>
                <span>{form.street || <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Дом:</strong>
                <span>{form.house || <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Квартира:</strong>
                <span>{form.apartment || <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Способ доставки:</strong>
                <span>{form.deliveryMethod || <span className="empty-field">Отсутствует</span>}</span>
              </div>
            </div>

            <div className="details-section">
              <h3>Медицинская информация</h3>
              <div className="detail-item">
                <strong>Тип консультации:</strong>
                <span>{form.consultationType || <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Категория исследования:</strong>
                <span>{form.researchCategory || <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Клинический диагноз:</strong>
                <span>{form.clinicalDiagnosis || <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Локализация процесса:</strong>
                <span>{form.processLocalization || <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Метод сбора материала:</strong>
                <span>{form.materialCollectionMethod || <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Количество локализаций:</strong>
                <span>{form.numberOfLocalizations ?? <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Количество контейнеров:</strong>
                <span>{form.numberOfContainers ?? <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Количество стекол:</strong>
                <span>{form.numberOfGlasses ?? <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Количество стекол для изготовления:</strong>
                <span>{form.numberOfGlassesToBeMade ?? <span className="empty-field">Отсутствует</span>}</span>
              </div>
            </div>

            <div className="details-section">
              <h3>Медицинские файлы</h3>
              {medicalFiles.length > 0 ? (
                <>
                  <div className="medical-files-row">
                    {medicalFiles.slice(0, 3).map((file, index) => (
                      <div
                        key={file.fileId ? file.fileId.toString() : `file-${index}`}
                        className="medical-file-icon"
                        onMouseEnter={() => setHoveredFile(index)}
                        onMouseLeave={() => setHoveredFile(null)}
                      >
                        <FaFileAlt className="file-icon" />
                        {hoveredFile === index && file.filename && (
                          <div className="custom-tooltip">{file.filename}</div>
                        )}
                      </div>
                    ))}
                  </div>
                  {medicalFiles.length > 3 && (
                    <div className="medical-files-carousel">
                      {medicalFiles.slice(3).map((file, index) => (
                        <div
                          key={file.fileId ? file.fileId.toString() : `file-${index + 3}`}
                          className="medical-file-icon"
                          onMouseEnter={() => setHoveredFile(index + 3)}
                          onMouseLeave={() => setHoveredFile(null)}
                        >
                          <FaFileAlt className="file-icon" />
                          {hoveredFile === index + 3 && file.filename && (
                            <div className="custom-tooltip">{file.filename}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <span className="empty-field">Отсутствует</span>
              )}
            </div>

            <div className="details-section">
              <h3>Дополнительная информация</h3>
              <div className="detail-item">
                <strong>Цена:</strong>
                <span>{form.researchPrice ? `${form.researchPrice} ₽` : <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Промокод:</strong>
                <span>{form.promoCode || <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Комментарий:</strong>
                <span>{form.comment || <span className="empty-field">Отсутствует</span>}</span>
              </div>
              <div className="detail-item">
                <strong>Согласие предоставлено:</strong>
                <span>{form.consentGiven ? 'Да' : 'Нет'}</span>
              </div>
            </div>

            <div className="details-section">
              <h3>Заметки</h3>
              <div className="notes-container">
                {notesArray.length > 0 ? (
                  notesArray.map((note, index) => (
                    <div
                      key={index}
                      className="note-bubble"
                      onMouseEnter={() => setHoveredNote(index)}
                      onMouseLeave={() => setHoveredNote(null)}
                    >
                      <span>{note.length > 50 ? `${note.substring(0, 50)}...` : note}</span>
                      <button
                        className="delete-note-button"
                        onClick={() => handleDeleteNote(index)}
                      >
                        <FaTrash />
                      </button>
                      {hoveredNote === index && (
                        <div className="custom-tooltip">{note}</div>
                      )}
                    </div>
                  ))
                ) : (
                  <span className="empty-field">Заметки отсутствуют</span>
                )}
              </div>
              <div className="detail-item">
                <strong>Добавить заметку:</strong>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Введите новую заметку..."
                  rows="2"
                />
                <button className="apply-button" onClick={handleAddNote}>
                  Добавить заметку
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDetails;