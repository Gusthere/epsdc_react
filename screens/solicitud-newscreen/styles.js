// Sugerencia para c:\xampp\htdocs\EPSDC-REACT\screens\solicitud-newscreen\styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    marginBottom: 8,
    marginTop: 12,
  },
  filtroLabel: { fontWeight: 'bold', fontSize: 12, marginBottom: 4 },
  pickerRow: {
    height: 50,
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: 4,
    justifyContent: 'center',
    marginBottom: 12,
  },
  inputGroup: {
    flex: 1,
    minWidth: 120,
    marginRight: 8,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  limpiarBtn: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    minWidth: 100,
    marginRight: 8,
  },
  agregarBtn: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    minWidth: 100,
  },
});